/**
 * tRPC router for managing the review update system.
 * All endpoints are admin-only.
 * Provides endpoints to:
 * - View system status and update logs
 * - Trigger a manual update for all or specific campgrounds
 * - Manage the scheduled cron job
 * - View per-campground review stats
 */

import { z } from "zod";
import { router, adminProcedure } from "./_core/trpc";
import { createHeartbeatJob, listHeartbeatJobs, updateHeartbeatJob } from "./_core/heartbeat";
import { storageGetSignedUrl, storagePut } from "./storage";
import { campgroundReviewConfigs } from "./scheduled/campgroundConfig";
import { fetchReviewsForCampground, FetchedReview } from "./scheduled/reviewFetcher";
import { distillReviews } from "./scheduled/reviewDistiller";

const UPDATE_LOG_KEY = "reviews/update_log.json";
const REVIEWS_STORAGE_PREFIX = "reviews/camp_";
const INSIGHTS_STORAGE_KEY = "reviews/reviewInsights.json";
const HEARTBEAT_JOB_NAME = "review-update-weekly";

interface ReviewFile {
  campgroundId: number;
  campgroundName: string;
  totalReviews: number;
  lastUpdated: string;
  reviews: FetchedReview[];
}

interface UpdateLogResult {
  campgroundId: number;
  name: string;
  newReviewsCount: number;
  totalReviews: number;
  distilled: boolean;
  sourceUsed?: string;
  error?: string;
}

interface UpdateLog {
  lastRun: string;
  triggeredBy: string;
  duration: string;
  results: UpdateLogResult[];
}

export const reviewRouter = router({
  /**
   * Get the current status of the review update system
   */
  status: adminProcedure.query(async () => {
    try {
      // Check if the cron job exists
      const { jobs } = await listHeartbeatJobs("", { page: 1, pageSize: 50 });
      const reviewJob = jobs.find(j => j.name === HEARTBEAT_JOB_NAME);

      // Get last update log
      let lastUpdate: UpdateLog | null = null;
      try {
        const url = await storageGetSignedUrl(UPDATE_LOG_KEY);
        const resp = await fetch(url);
        if (resp.ok) {
          lastUpdate = await resp.json() as UpdateLog;
        }
      } catch {
        // No update log yet
      }

      return {
        cronJobExists: !!reviewJob,
        cronJobEnabled: reviewJob?.isEnable ?? false,
        cronExpression: reviewJob?.cronExpression ?? null,
        nextExecution: reviewJob?.nextExecutionAt ?? null,
        taskUid: reviewJob?.taskUid ?? null,
        lastUpdate,
        totalCampgrounds: campgroundReviewConfigs.length,
        sourceBreakdown: {
          recreationGov: campgroundReviewConfigs.filter(c => c.recGovCampgroundId).length,
          koa: campgroundReviewConfigs.filter(c => c.koaReviewsUrl).length,
          googleMapsOnly: campgroundReviewConfigs.filter(c => !c.recGovCampgroundId && !c.koaReviewsUrl).length,
        },
      };
    } catch (error) {
      return {
        cronJobExists: false,
        cronJobEnabled: false,
        cronExpression: null,
        nextExecution: null,
        taskUid: null,
        lastUpdate: null,
        totalCampgrounds: campgroundReviewConfigs.length,
        sourceBreakdown: { recreationGov: 0, koa: 0, googleMapsOnly: 0 },
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }),

  /**
   * Get per-campground review stats
   */
  campgroundStats: adminProcedure.query(async () => {
    const stats: Array<{
      id: number;
      name: string;
      primarySource: string;
      totalReviews: number;
      lastUpdated: string | null;
    }> = [];

    for (const config of campgroundReviewConfigs) {
      let totalReviews = 0;
      let lastUpdated: string | null = null;

      try {
        const key = `${REVIEWS_STORAGE_PREFIX}${config.id}.json`;
        const url = await storageGetSignedUrl(key);
        const resp = await fetch(url);
        if (resp.ok) {
          const data = await resp.json() as ReviewFile;
          totalReviews = data.totalReviews;
          lastUpdated = data.lastUpdated;
        }
      } catch {
        // No data yet for this campground
      }

      stats.push({
        id: config.id,
        name: config.name,
        primarySource: config.recGovCampgroundId ? "Recreation.gov" : config.koaReviewsUrl ? "KOA" : "Google Maps",
        totalReviews,
        lastUpdated,
      });
    }

    return stats;
  }),

  /**
   * Manually trigger a review update for all or specific campgrounds
   */
  triggerUpdate: adminProcedure
    .input(z.object({
      campgroundIds: z.array(z.number()).optional(), // If empty/undefined, update all
    }).optional())
    .mutation(async ({ input }) => {
      const startTime = Date.now();
      const targetIds = input?.campgroundIds;

      const configs = targetIds && targetIds.length > 0
        ? campgroundReviewConfigs.filter(c => targetIds.includes(c.id))
        : campgroundReviewConfigs;

      if (configs.length === 0) {
        throw new Error("No matching campgrounds found for the given IDs");
      }

      const results: UpdateLogResult[] = [];

      // Load existing insights
      let allInsights: Record<string, any> = {};
      try {
        const url = await storageGetSignedUrl(INSIGHTS_STORAGE_KEY);
        const resp = await fetch(url);
        if (resp.ok) {
          allInsights = await resp.json();
        }
      } catch {
        // Start fresh
      }

      for (const config of configs) {
        try {
          // Fetch new reviews
          const newReviews = await fetchReviewsForCampground(config);

          // Determine which source was actually used
          let sourceUsed = "Google Maps";
          if (newReviews.length > 0) {
            sourceUsed = newReviews[0].source;
          }

          // Load existing reviews and merge
          let existing: FetchedReview[] = [];
          try {
            const key = `${REVIEWS_STORAGE_PREFIX}${config.id}.json`;
            const url = await storageGetSignedUrl(key);
            const resp = await fetch(url);
            if (resp.ok) {
              const data = await resp.json() as ReviewFile;
              existing = data.reviews || [];
            }
          } catch { /* no existing */ }

          // Deduplicate
          const existingKeys = new Set(
            existing.map(r => `${r.author}|${r.date}|${r.text.substring(0, 50)}`)
          );
          const uniqueNew = newReviews.filter(r => {
            const key = `${r.author}|${r.date}|${r.text.substring(0, 50)}`;
            return !existingKeys.has(key);
          });
          const merged = [...uniqueNew, ...existing];

          // Save to S3
          const reviewFile: ReviewFile = {
            campgroundId: config.id,
            campgroundName: config.name,
            totalReviews: merged.length,
            lastUpdated: new Date().toISOString(),
            reviews: merged,
          };
          const key = `${REVIEWS_STORAGE_PREFIX}${config.id}.json`;
          await storagePut(key, Buffer.from(JSON.stringify(reviewFile)), "application/json");

          // Distill if needed
          let distilled = false;
          if (merged.length >= 3 && (uniqueNew.length > 0 || !allInsights[String(config.id)])) {
            const insights = await distillReviews(config.name, merged);
            if (insights) {
              allInsights[String(config.id)] = insights;
              distilled = true;
            }
          }

          results.push({
            campgroundId: config.id,
            name: config.name,
            newReviewsCount: uniqueNew.length,
            totalReviews: merged.length,
            distilled,
            sourceUsed,
          });
        } catch (error) {
          results.push({
            campgroundId: config.id,
            name: config.name,
            newReviewsCount: 0,
            totalReviews: 0,
            distilled: false,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      // Save updated insights
      await storagePut(
        INSIGHTS_STORAGE_KEY,
        Buffer.from(JSON.stringify(allInsights, null, 2)),
        "application/json"
      );

      // Save update log
      const duration = `${((Date.now() - startTime) / 1000).toFixed(1)}s`;
      const updateLog: UpdateLog = {
        lastRun: new Date().toISOString(),
        triggeredBy: "manual",
        duration,
        results,
      };
      await storagePut(
        UPDATE_LOG_KEY,
        Buffer.from(JSON.stringify(updateLog, null, 2)),
        "application/json"
      );

      return {
        ok: true,
        duration,
        campgroundsProcessed: results.length,
        newReviewsTotal: results.reduce((sum, r) => sum + r.newReviewsCount, 0),
        distilledCount: results.filter(r => r.distilled).length,
        errorsCount: results.filter(r => r.error).length,
        results,
      };
    }),

  /**
   * Create or update the weekly review update cron job
   */
  setupCron: adminProcedure
    .input(z.object({
      cron: z.string().default("0 3 * * 1"), // Default: Every Monday at 3 AM UTC
    }))
    .mutation(async ({ input }) => {
      const { jobs } = await listHeartbeatJobs("", { page: 1, pageSize: 50 });
      const existingJob = jobs.find(j => j.name === HEARTBEAT_JOB_NAME);

      if (existingJob) {
        await updateHeartbeatJob(existingJob.taskUid, {
          cron: input.cron,
          enable: true,
        }, "");
        return { action: "updated", taskUid: existingJob.taskUid };
      }

      const result = await createHeartbeatJob({
        name: HEARTBEAT_JOB_NAME,
        cron: input.cron,
        path: "/api/scheduled/update-reviews",
        method: "POST",
        description: "Weekly review update: fetches new reviews from Recreation.gov (primary), KOA (primary), and Google Maps (fallback), then distills insights using LLM",
      }, "");

      return { action: "created", taskUid: result.taskUid, nextExecution: result.nextExecutionAt };
    }),

  /**
   * Pause or resume the cron job
   */
  toggleCron: adminProcedure
    .input(z.object({ enable: z.boolean() }))
    .mutation(async ({ input }) => {
      const { jobs } = await listHeartbeatJobs("", { page: 1, pageSize: 50 });
      const reviewJob = jobs.find(j => j.name === HEARTBEAT_JOB_NAME);

      if (!reviewJob) {
        throw new Error("Review update cron job not found. Please set it up first.");
      }

      await updateHeartbeatJob(reviewJob.taskUid, { enable: input.enable }, "");
      return { enabled: input.enable };
    }),
});
