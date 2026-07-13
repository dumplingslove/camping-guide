import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getFavorites, addFavorite, removeFavorite, bulkAddFavorites } from "./db";

export const favoritesRouter = router({
  /** Get all favorites for the current user */
  list: protectedProcedure.query(async ({ ctx }) => {
    const favs = await getFavorites(ctx.user.id);
    return favs.map((f) => f.campgroundId);
  }),

  /** Toggle a favorite (add if not exists, remove if exists) */
  toggle: protectedProcedure
    .input(z.object({ campgroundId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const favs = await getFavorites(ctx.user.id);
      const exists = favs.some((f) => f.campgroundId === input.campgroundId);
      if (exists) {
        await removeFavorite(ctx.user.id, input.campgroundId);
        return { added: false };
      } else {
        await addFavorite(ctx.user.id, input.campgroundId);
        return { added: true };
      }
    }),

  /** Bulk import favorites (for localStorage migration) */
  bulkImport: protectedProcedure
    .input(z.object({ campgroundIds: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      await bulkAddFavorites(ctx.user.id, input.campgroundIds);
      return { success: true, imported: input.campgroundIds.length };
    }),
});
