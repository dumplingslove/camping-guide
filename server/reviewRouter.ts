/**
 * tRPC router for managing the review update system.
 * Provides endpoints to:
 * - Create/manage the scheduled review update cron job
 * - View update logs and status
 * - Trigger a manual update
 */

import { z } from "zod";
import { router, protectedProcedure } from "./_core/trpc";
import { createHeartbeatJob, listHeartbeatJobs, updateHeartbeatJob, deleteHeartbeatJob } from "./_core/heartbeat";
import { storageGetSignedUrl } from "./storage";

const UPDATE_LOG_KEY = "reviews/update_log.json";
const HEARTBEAT_JOB_NAME = "review-update-weekly";

export const reviewRouter = router({
  /**
   * Get the current status of the review update system
   */
  status: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Check if the cron job exists
      const { jobs } = await listHeartbeatJobs("", { page: 1, pageSize: 50 });
      const reviewJob = jobs.find(j => j.name === HEARTBEAT_JOB_NAME);

      // Get last update log
      let lastUpdate = null;
      try {
        const url = await storageGetSignedUrl(UPDATE_LOG_KEY);
        const resp = await fetch(url);
        if (resp.ok) {
          lastUpdate = await resp.json();
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
      };
    } catch (error) {
      return {
        cronJobExists: false,
        cronJobEnabled: false,
        cronExpression: null,
        nextExecution: null,
        taskUid: null,
        lastUpdate: null,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }),

  /**
   * Create or update the weekly review update cron job
   */
  setupCron: protectedProcedure
    .input(z.object({
      cron: z.string().default("0 3 * * 1"), // Default: Every Monday at 3 AM UTC
    }))
    .mutation(async ({ input, ctx }) => {
      // Check if job already exists
      const { jobs } = await listHeartbeatJobs("", { page: 1, pageSize: 50 });
      const existingJob = jobs.find(j => j.name === HEARTBEAT_JOB_NAME);

      if (existingJob) {
        // Update existing job
        await updateHeartbeatJob(existingJob.taskUid, {
          cron: input.cron,
          enable: true,
        }, "");
        return { action: "updated", taskUid: existingJob.taskUid };
      }

      // Create new job
      const result = await createHeartbeatJob({
        name: HEARTBEAT_JOB_NAME,
        cron: input.cron,
        path: "/api/scheduled/update-reviews",
        method: "POST",
        description: "Weekly review update: fetches new reviews from Google Maps, Recreation.gov, and KOA, then distills insights using LLM",
      }, "");

      return { action: "created", taskUid: result.taskUid, nextExecution: result.nextExecutionAt };
    }),

  /**
   * Pause or resume the cron job
   */
  toggleCron: protectedProcedure
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
