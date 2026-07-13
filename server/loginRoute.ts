import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
import { getUserByEmail } from "./db";

/**
 * Express POST /api/auth/login
 * Sets session cookie and returns user info.
 * This is a regular Express route (not tRPC) because tRPC's JSONL streaming
 * mode sends headers before the procedure runs, making res.cookie() fail.
 */
export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "请填写邮箱和密码" });
    }

    const user = await getUserByEmail(email);
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: "邮箱或密码错误" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "邮箱或密码错误" });
    }

    // Create session token using the existing SDK (same as OAuth flow)
    const sessionToken = await sdk.createSessionToken(user.openId, {
      name: user.name || "",
      expiresInMs: ONE_YEAR_MS,
    });

    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, sessionToken, {
      ...cookieOptions,
      maxAge: ONE_YEAR_MS,
    });

    return res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err: any) {
    console.error("[Login Error]", err);
    return res.status(500).json({ error: "登录失败，请稍后重试" });
  }
}
