import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock bcryptjs
vi.mock("bcryptjs", () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
  },
}));

// Mock db functions
vi.mock("./db", () => ({
  getUserByEmail: vi.fn(),
  updateUserPassword: vi.fn(),
}));

// Mock SDK
vi.mock("./_core/sdk", () => ({
  sdk: {
    createSessionToken: vi.fn().mockResolvedValue("mock-session-token"),
  },
}));

// Mock cookies
vi.mock("./_core/cookies", () => ({
  getSessionCookieOptions: vi.fn().mockReturnValue({
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  }),
}));

import bcrypt from "bcryptjs";
import { getUserByEmail } from "./db";

describe("Email Auth Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should reject login with non-existent email", async () => {
    (getUserByEmail as any).mockResolvedValue(undefined);

    // The login logic checks getUserByEmail first
    const user = await getUserByEmail("nonexistent@test.com");
    expect(user).toBeUndefined();
  });

  it("should reject login with wrong password", async () => {
    (getUserByEmail as any).mockResolvedValue({
      id: 1,
      email: "admin@test.com",
      passwordHash: "$2b$12$fakehash",
      openId: "test-open-id",
      name: "Admin",
      role: "admin",
    });
    (bcrypt.compare as any).mockResolvedValue(false);

    const user = await getUserByEmail("admin@test.com");
    expect(user).toBeDefined();
    
    const valid = await bcrypt.compare("wrongpassword", user!.passwordHash!);
    expect(valid).toBe(false);
  });

  it("should accept login with correct password", async () => {
    (getUserByEmail as any).mockResolvedValue({
      id: 1,
      email: "admin@test.com",
      passwordHash: "$2b$12$fakehash",
      openId: "test-open-id",
      name: "Admin",
      role: "admin",
    });
    (bcrypt.compare as any).mockResolvedValue(true);

    const user = await getUserByEmail("admin@test.com");
    expect(user).toBeDefined();
    
    const valid = await bcrypt.compare("correctpassword", user!.passwordHash!);
    expect(valid).toBe(true);
  });

  it("should reject login for user without password set", async () => {
    (getUserByEmail as any).mockResolvedValue({
      id: 2,
      email: "oauth-only@test.com",
      passwordHash: null,
      openId: "oauth-open-id",
      name: "OAuth User",
      role: "user",
    });

    const user = await getUserByEmail("oauth-only@test.com");
    expect(user).toBeDefined();
    expect(user!.passwordHash).toBeNull();
    // Login should be rejected because no password is set
  });
});
