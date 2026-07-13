import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, visitedRecords, InsertVisitedRecord, VisitedRecord, favorites, Favorite, InsertFavorite } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ===== Visited Records =====

export async function getVisitedRecords(userId: number): Promise<VisitedRecord[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(visitedRecords)
    .where(eq(visitedRecords.userId, userId))
    .orderBy(desc(visitedRecords.startDate));
}

export async function addVisitedRecord(record: InsertVisitedRecord): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(visitedRecords).values(record);
}

export async function deleteVisitedRecord(id: number, userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(visitedRecords).where(
    and(eq(visitedRecords.id, id), eq(visitedRecords.userId, userId))
  );
}

export async function updateVisitedRecord(
  id: number,
  userId: number,
  data: Partial<Pick<InsertVisitedRecord, 'startDate' | 'endDate' | 'sites' | 'notes'>>
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(visitedRecords)
    .set(data)
    .where(and(eq(visitedRecords.id, id), eq(visitedRecords.userId, userId)));
}

// ===== Auth Helpers =====

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserPassword(userId: number, passwordHash: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
}

// ===== Favorites =====

export async function getFavorites(userId: number): Promise<Favorite[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(favorites)
    .where(eq(favorites.userId, userId))
    .orderBy(desc(favorites.createdAt));
}

export async function addFavorite(userId: number, campgroundId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Avoid duplicates
  const existing = await db.select().from(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.campgroundId, campgroundId)))
    .limit(1);
  if (existing.length > 0) return;
  await db.insert(favorites).values({ userId, campgroundId });
}

export async function removeFavorite(userId: number, campgroundId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(favorites).where(
    and(eq(favorites.userId, userId), eq(favorites.campgroundId, campgroundId))
  );
}

export async function bulkAddFavorites(userId: number, campgroundIds: number[]): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (campgroundIds.length === 0) return;
  // Get existing favorites to avoid duplicates
  const existing = await db.select().from(favorites).where(eq(favorites.userId, userId));
  const existingIds = new Set(existing.map(f => f.campgroundId));
  const newIds = campgroundIds.filter(id => !existingIds.has(id));
  if (newIds.length === 0) return;
  await db.insert(favorites).values(newIds.map(id => ({ userId, campgroundId: id })));
}
