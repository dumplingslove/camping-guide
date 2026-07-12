import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { addVisitedRecord, deleteVisitedRecord, getVisitedRecords, updateVisitedRecord } from "./db";

export const visitedRouter = router({
  // Get all visited records for the current user
  list: protectedProcedure.query(async ({ ctx }) => {
    return getVisitedRecords(ctx.user.id);
  }),

  // Add a new visited record
  add: protectedProcedure
    .input(
      z.object({
        campgroundId: z.number(),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        sites: z.string().max(100).default(""),
        notes: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await addVisitedRecord({
        userId: ctx.user.id,
        campgroundId: input.campgroundId,
        startDate: input.startDate,
        endDate: input.endDate || null,
        sites: input.sites,
        notes: input.notes || null,
      });
      return { success: true };
    }),

  // Delete a visited record
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await deleteVisitedRecord(input.id, ctx.user.id);
      return { success: true };
    }),

  // Update a visited record
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullish(),
        sites: z.string().max(100).optional(),
        notes: z.string().max(2000).nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const updateData: Record<string, unknown> = {};
      if (data.startDate !== undefined) updateData.startDate = data.startDate;
      if (data.endDate !== undefined) updateData.endDate = data.endDate;
      if (data.sites !== undefined) updateData.sites = data.sites;
      if (data.notes !== undefined) updateData.notes = data.notes;
      await updateVisitedRecord(id, ctx.user.id, updateData as any);
      return { success: true };
    }),
});
