import { useAuth } from "@/_core/hooks/useAuth";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { fetchProfileMap } from "@/lib/profiles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface VisitedEntry {
  id?: number | string; // DB id, undefined for localStorage entries
  campgroundId: number;
  startDate: string;
  endDate?: string | null;
  sites: string;
  notes?: string | null;
  userId?: string; // cloud owner; undefined for local entries
  ownerName?: string; // display name of the owner (both allowlisted accounts see each other)
  isMine?: boolean; // false => written by the other account (read-only for me)
}

const VISITED_PREFIX = "camp_visited_";
const VISITED_GLOBAL = "camp_visited_global";
const MIGRATED_KEY = "supabase_visited_migrated";

interface LocalVisitRaw {
  date?: string;
  startDate?: string;
  endDate?: string | null;
  sites?: string;
  notes?: string | null;
}

function readLocalEntries(): VisitedEntry[] {
  const entries: VisitedEntry[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(VISITED_PREFIX) || key === VISITED_GLOBAL) continue;
      const campId = parseInt(key.replace(VISITED_PREFIX, ""), 10);
      if (isNaN(campId)) continue;
      const stored = JSON.parse(localStorage.getItem(key) || "[]") as LocalVisitRaw[];
      for (const entry of stored) {
        entries.push({
          campgroundId: campId,
          startDate: entry.date || entry.startDate || "",
          endDate: entry.endDate || null,
          sites: entry.sites || "",
          notes: entry.notes || null,
        });
      }
    }
  } catch {}
  return entries;
}

function clearLocalEntries() {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith(VISITED_PREFIX) || key === VISITED_GLOBAL)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}
}

function updateLocalGlobal(campgroundId: number, entries: LocalVisitRaw[]) {
  try {
    const global = JSON.parse(localStorage.getItem(VISITED_GLOBAL) || "{}");
    if (entries.length > 0) {
      const last = entries[0];
      const date = last.date || last.startDate || "";
      const dateDisplay = last.endDate ? `${date} ~ ${last.endDate}` : date;
      global[campgroundId] = {
        count: entries.length,
        lastVisit: dateDisplay,
        lastSites: last.sites || "",
      };
    } else {
      delete global[campgroundId];
    }
    localStorage.setItem(VISITED_GLOBAL, JSON.stringify(global));
  } catch {}
}

/**
 * Visited records ("去过打卡").
 * - Logged in (Supabase configured): stored in the visited_records table, syncs across devices.
 * - Not logged in: falls back to localStorage.
 */
export function useVisited() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [cloudVisits, setCloudVisits] = useState<VisitedEntry[]>([]);
  const [localVisits, setLocalVisits] = useState<VisitedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const migratingRef = useRef(false);

  const cloudEnabled = supabaseConfigured && !!supabase && isAuthenticated && !!user;

  const loadCloud = useCallback(async () => {
    if (!supabase || !user) return;
    const { data, error } = await supabase
      .from("visited_records")
      .select("id, campground_id, start_date, end_date, sites, notes, user_id")
      .order("start_date", { ascending: false });
    if (error) {
      console.warn("加载去过记录失败", error.message);
      return;
    }
    // Both allowlisted accounts (darancai / nckuang123) see each other's rows;
    // label them so it's clear who wrote what.
    const profileMap = await fetchProfileMap(supabase);
    setCloudVisits(
      (data || []).map((r: any) => {
        const mine = r.user_id === user.id;
        return {
          id: r.id,
          campgroundId: r.campground_id,
          startDate: r.start_date,
          endDate: r.end_date,
          sites: r.sites || "",
          notes: r.notes,
          userId: r.user_id,
          isMine: mine,
          ownerName: mine ? undefined : profileMap.get(r.user_id) || "家人",
        };
      })
    );
  }, [user]);

  // Initial load: local always; cloud when logged in (plus one-time migration)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLocalVisits(readLocalEntries());
      if (cloudEnabled && supabase && user && !migratingRef.current) {
        migratingRef.current = true;
        try {
          if (!localStorage.getItem(MIGRATED_KEY)) {
            const local = readLocalEntries().filter((e) => e.startDate);
            if (local.length > 0) {
              const rows = local.map((e) => ({
                user_id: user.id,
                campground_id: e.campgroundId,
                start_date: e.startDate,
                end_date: e.endDate || null,
                sites: e.sites || "",
                notes: e.notes || null,
              }));
              const { error } = await supabase
                .from("visited_records")
                .upsert(rows, { onConflict: "user_id,campground_id,start_date,sites" });
              if (!error) {
                localStorage.setItem(MIGRATED_KEY, "true");
                clearLocalEntries();
                if (!cancelled) setLocalVisits([]);
              } else {
                console.warn("去过记录迁移失败", error.message);
              }
            } else {
              localStorage.setItem(MIGRATED_KEY, "true");
            }
          }
          if (!cancelled) await loadCloud();
        } finally {
          migratingRef.current = false;
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloudEnabled]);

  const visits: VisitedEntry[] = useMemo(
    () => (cloudEnabled ? cloudVisits : localVisits),
    [cloudEnabled, cloudVisits, localVisits]
  );

  const getVisitsForCampground = useCallback(
    (campgroundId: number) => visits.filter((v) => v.campgroundId === campgroundId),
    [visits]
  );

  const addVisit = useCallback(
    async (entry: Omit<VisitedEntry, "id">) => {
      if (cloudEnabled && supabase && user) {
        const { error } = await supabase.from("visited_records").insert({
          user_id: user.id,
          campground_id: entry.campgroundId,
          start_date: entry.startDate,
          end_date: entry.endDate || null,
          sites: entry.sites || "",
          notes: entry.notes || null,
        });
        if (error) throw new Error(error.message);
        await loadCloud();
        return;
      }
      // localStorage fallback
      const storageKey = `${VISITED_PREFIX}${entry.campgroundId}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || "[]") as LocalVisitRaw[];
      const newEntry: LocalVisitRaw = {
        date: entry.startDate,
        endDate: entry.endDate || undefined,
        sites: entry.sites,
        notes: entry.notes || "",
      };
      const updated = [newEntry, ...existing];
      localStorage.setItem(storageKey, JSON.stringify(updated));
      updateLocalGlobal(entry.campgroundId, updated);
      setLocalVisits((prev) => [{ ...entry }, ...prev]);
    },
    [cloudEnabled, user, loadCloud]
  );

  const deleteVisit = useCallback(
    async (entry: VisitedEntry, index?: number) => {
      if (cloudEnabled && supabase && entry.id !== undefined) {
        const { error } = await supabase
          .from("visited_records")
          .delete()
          .eq("id", entry.id);
        if (error) throw new Error(error.message);
        await loadCloud();
        return;
      }
      // localStorage fallback
      const storageKey = `${VISITED_PREFIX}${entry.campgroundId}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || "[]") as LocalVisitRaw[];
      if (index !== undefined) {
        existing.splice(index, 1);
      } else {
        const idx = existing.findIndex(
          (e) => (e.date || e.startDate) === entry.startDate && (e.sites || "") === entry.sites
        );
        if (idx >= 0) existing.splice(idx, 1);
      }
      localStorage.setItem(storageKey, JSON.stringify(existing));
      updateLocalGlobal(entry.campgroundId, existing);
      setLocalVisits((prev) =>
        prev.filter(
          (v) =>
            !(
              v.campgroundId === entry.campgroundId &&
              v.startDate === entry.startDate &&
              v.sites === entry.sites
            )
        )
      );
    },
    [cloudEnabled, loadCloud]
  );

  const refetch = useCallback(async () => {
    if (cloudEnabled) {
      await loadCloud();
    } else {
      setLocalVisits(readLocalEntries());
    }
  }, [cloudEnabled, loadCloud]);

  return {
    visits,
    loading: authLoading || loading,
    isAuthenticated,
    getVisitsForCampground,
    addVisit,
    deleteVisit,
    refetch,
  };
}
