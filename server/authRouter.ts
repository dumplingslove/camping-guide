import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { updateUserPassword } from "./db";
import bcrypt from "bcryptjs";

export const authRouter = router({
  /** Change password (requires current session) */
  changePassword: publicProcedure
    .input(
      z.object({
        currentPassword: z.string().min(1),
        newPassword: z.string().min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("请先登录");
      }

      // Verify current password if one exists
      if (ctx.user.passwordHash) {
        const valid = await bcrypt.compare(input.currentPassword, ctx.user.passwordHash);
        if (!valid) {
          throw new Error("当前密码错误");
        }
      }

      const hash = await bcrypt.hash(input.newPassword, 12);
      await updateUserPassword(ctx.user.id, hash);

      return { success: true };
    }),
});
