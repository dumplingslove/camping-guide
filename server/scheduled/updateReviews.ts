/**
 * Scheduled Review Update Handler
 * 
 * This handler is called by the Heartbeat cron system (POST /api/scheduled/update-reviews).
 * It fetches new reviews from all sources, merges with existing data, and runs LLM distillation.
 * 
 * Since this runs in a deployed environment (not dev), we write results to S3 storage
 * and serve them via a tRPC endpoint, rather than writing to local filesystem.
 */

import type { Request, Response } from "express";
import { sdk } from "../_core/sdk";
import { campgroundReviewConfigs } from "./campgroundConfig";
import { fetchReviewsForCampground, FetchedReview } from "./reviewFetcher";
import { distillReviews, CampgroundInsights } from "./reviewDistiller";
import { storagePut, storageGetSignedUrl } from "../storage";
import { checkClosureStatus, ClosureStatusResult } from "./closureChecker";

// Key for storing review data and insights in S3
const REVIEWS_STORAGE_PREFIX = "reviews/camp_";
const INSIGHTS_STORAGE_KEY = "reviews/reviewInsights.json";
const UPDATE_LOG_KEY = "reviews/update_log.json";

interface ReviewFile {
  campgroundId: number;
  campgroundName: string;
  totalReviews: number;
  lastUpdated: string;
  reviews: FetchedReview[];
}

interface UpdateLog {
  lastRun: string;
  results: Array<{
    campgroundId: number;
    name: string;
    newReviewsCount: number;
    totalReviews: number;
    distilled: boolean;
    error?: string;
  }>;
}

/**
 * Load existing reviews from S3 storage
 */
async function loadExistingReviews(campgroundId: number): Promise<FetchedReview[]> {
  try {
    const key = `${REVIEWS_STORAGE_PREFIX}${campgroundId}.json`;
    const url = await storageGetSignedUrl(key);
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json() as ReviewFile;
    return data.reviews || [];
  } catch {
    return [];
  }
}

/**
 * Merge new reviews with existing ones, deduplicating by author + date + text similarity
 */
function mergeReviews(existing: FetchedReview[], newReviews: FetchedReview[]): {
  merged: FetchedReview[];
  addedCount: number;
} {
  const existingKeys = new Set(
    existing.map(r => `${r.author}|${r.date}|${r.text.substring(0, 50)}`)
  );

  const uniqueNew = newReviews.filter(r => {
    const key = `${r.author}|${r.date}|${r.text.substring(0, 50)}`;
    return !existingKeys.has(key);
  });

  return {
    merged: [...uniqueNew, ...existing],
    addedCount: uniqueNew.length,
  };
}

/**
 * Main handler for the scheduled review update
 */
export async function updateReviewsHandler(req: Request, res: Response) {
  const startTime = Date.now();

  try {
    // Authenticate - must be a cron call
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron) {
      return res.status(403).json({ error: "cron-only endpoint" });
    }

    console.log("[UpdateReviews] Starting scheduled review update...");

    const results: UpdateLog["results"] = [];
    const allInsights: Record<string, CampgroundInsights> = {};

    // Load existing insights
    try {
      const url = await storageGetSignedUrl(INSIGHTS_STORAGE_KEY);
      const resp = await fetch(url);
      if (resp.ok) {
        const existing = await resp.json() as Record<string, CampgroundInsights>;
        Object.assign(allInsights, existing);
      }
    } catch {
      // No existing insights, start fresh
    }

    // Process each campground
    for (const config of campgroundReviewConfigs) {
      try {
        console.log(`[UpdateReviews] Processing campground ${config.id}: ${config.name}`);

        // Fetch new reviews
        const newReviews = await fetchReviewsForCampground(config);

        // Load existing and merge
        const existing = await loadExistingReviews(config.id);
        const { merged, addedCount } = mergeReviews(existing, newReviews);

        // Save merged reviews to S3
        const reviewFile: ReviewFile = {
          campgroundId: config.id,
          campgroundName: config.name,
          totalReviews: merged.length,
          lastUpdated: new Date().toISOString(),
          reviews: merged,
        };

        const key = `${REVIEWS_STORAGE_PREFIX}${config.id}.json`;
        await storagePut(key, Buffer.from(JSON.stringify(reviewFile)), "application/json");

        // Run distillation if we have enough reviews (and new ones were added or no existing insights)
        let distilled = false;
        if (merged.length >= 3 && (addedCount > 0 || !allInsights[String(config.id)])) {
          const insights = await distillReviews(config.name, merged);
          if (insights) {
            allInsights[String(config.id)] = insights;
            distilled = true;
          }
        }

        results.push({
          campgroundId: config.id,
          name: config.name,
          newReviewsCount: addedCount,
          totalReviews: merged.length,
          distilled,
        });

        console.log(`[UpdateReviews] Campground ${config.id}: ${addedCount} new reviews, ${merged.length} total, distilled=${distilled}`);
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        results.push({
          campgroundId: config.id,
          name: config.name,
          newReviewsCount: 0,
          totalReviews: 0,
          distilled: false,
          error: errMsg,
        });
        console.error(`[UpdateReviews] Error processing campground ${config.id}:`, error);
      }
    }

    // Save updated insights to S3
    await storagePut(
      INSIGHTS_STORAGE_KEY,
      Buffer.from(JSON.stringify(allInsights, null, 2)),
      "application/json"
    );

    // Check closure status for restricted campgrounds
    let closureResults: ClosureStatusResult[] = [];
    try {
      closureResults = await checkClosureStatus();
    } catch (error) {
      console.error("[UpdateReviews] Closure check failed:", error);
    }

    // Save update log
    const updateLog: UpdateLog = {
      lastRun: new Date().toISOString(),
      results,
    };
    await storagePut(
      UPDATE_LOG_KEY,
      Buffer.from(JSON.stringify(updateLog, null, 2)),
      "application/json"
    );

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const totalNew = results.reduce((sum, r) => sum + r.newReviewsCount, 0);
    const totalDistilled = results.filter(r => r.distilled).length;
    const errors = results.filter(r => r.error).length;

    console.log(`[UpdateReviews] Completed in ${duration}s: ${totalNew} new reviews, ${totalDistilled} distilled, ${errors} errors`);

    res.json({
      ok: true,
      duration: `${duration}s`,
      summary: {
        campgroundsProcessed: results.length,
        newReviewsTotal: totalNew,
        distilledCount: totalDistilled,
        errorsCount: errors,
        closureChecks: closureResults.length,
        possiblyReopened: closureResults.filter(r => r.status === "possibly_reopened").length,
      },
      results,
      closureStatus: closureResults,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("[UpdateReviews] Fatal error:", error);

    res.status(500).json({
      error: errMsg,
      stack,
      context: { url: req.url, taskUid: (req as any).taskUid },
      timestamp: new Date().toISOString(),
    });
  }
}
