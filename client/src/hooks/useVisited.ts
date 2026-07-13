import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface VisitedEntry {
  id?: number; // DB id, undefined for localStorage entries
  campgroundId: number;
  startDate: string;
  endDate?: string | null;
  sites: string;
  notes?: string | null;
}

/**
 * Hook that manages visited records.
 * - Logged-in users: data stored in database, syncs across devices
 * - Not logged in: falls back to localStorage
 */
export function useVisited() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  // DB-backed data for logged-in users
  const dbQuery = trpc.visited.list.useQuery(undefined, {
    enabled: isAuthenticated,
    refetchOnWindowFocus: true,
  });

  const addMutation = trpc.visited.add.useMutation({
    onSuccess: () => dbQuery.refetch(),
  });
  const deleteMutation = trpc.visited.delete.useMutation({
    onSuccess: () => dbQuery.refetch(),
  });

  const bulkImportMutation = trpc.visited.bulkImport.useMutation({
    onSuccess: () => dbQuery.refetch(),
  });

  // Auto-migrate localStorage visited data to DB on first login
  useEffect(() => {
    if (!isAuthenticated) return;
    if (dbQuery.isLoading) return;

    const MIGRATED_KEY = "camp_visited_migrated";
    if (localStorage.getItem(MIGRATED_KEY)) return;

    // Collect all localStorage visited entries
    const entries: { campgroundId: number; startDate: string; endDate?: string | null; sites: string; notes?: string | null }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("camp_visited_") && key !== "camp_visited_global") {
        const campId = parseInt(key.replace("camp_visited_", ""), 10);
        if (isNaN(campId)) continue;
        try {
          const stored = JSON.parse(localStorage.getItem(key) || "[]");
          for (const entry of stored) {
            entries.push({
              campgroundId: campId,
              startDate: entry.date || entry.startDate || "",
              endDate: entry.endDate || null,
              sites: entry.sites || "",
              notes: entry.notes || null,
            });
          }
        } catch {}
      }
    }

    if (entries.length > 0) {
      bulkImportMutation.mutate(
        { records: entries },
        {
          onSuccess: () => {
            localStorage.setItem(MIGRATED_KEY, "true");
            // Clean up localStorage visited entries
            const keysToRemove: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key && (key.startsWith("camp_visited_") || key === "camp_visited_global")) {
                keysToRemove.push(key);
              }
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
          },
        }
      );
    } else {
      localStorage.setItem(MIGRATED_KEY, "true");
    }
  }, [isAuthenticated, dbQuery.isLoading]);

  // localStorage fallback for non-logged-in users
  const [localVisits, setLocalVisits] = useState<VisitedEntry[]>([]);

  useEffect(() => {
    if (isAuthenticated) return;
    // Load all localStorage visited entries
    try {
      const entries: VisitedEntry[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("camp_visited_") && key !== "camp_visited_global") {
          const campId = parseInt(key.replace("camp_visited_", ""), 10);
          if (isNaN(campId)) continue;
          const stored = JSON.parse(localStorage.getItem(key) || "[]");
          for (const entry of stored) {
            entries.push({
              campgroundId: campId,
              startDate: entry.date,
              endDate: entry.endDate || null,
              sites: entry.sites || "",
              notes: entry.notes || null,
            });
          }
        }
      }
      setLocalVisits(entries);
    } catch {}
  }, [isAuthenticated]);

  // Unified visits list
  const visits: VisitedEntry[] = useMemo(() => {
    if (isAuthenticated && dbQuery.data) {
      return dbQuery.data.map((r) => ({
        id: r.id,
        campgroundId: r.campgroundId,
        startDate: r.startDate,
        endDate: r.endDate,
        sites: r.sites,
        notes: r.notes,
      }));
    }
    return localVisits;
  }, [isAuthenticated, dbQuery.data, localVisits]);

  // Get visits for a specific campground
  const getVisitsForCampground = useCallback(
    (campgroundId: number) => {
      return visits.filter((v) => v.campgroundId === campgroundId);
    },
    [visits]
  );

  // Add a visit
  const addVisit = useCallback(
    async (entry: Omit<VisitedEntry, "id">) => {
      if (isAuthenticated) {
        await addMutation.mutateAsync({
          campgroundId: entry.campgroundId,
          startDate: entry.startDate,
          endDate: entry.endDate || undefined,
          sites: entry.sites,
          notes: entry.notes || undefined,
        });
      } else {
        // localStorage fallback
        const storageKey = `camp_visited_${entry.campgroundId}`;
        const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const newEntry = {
          date: entry.startDate,
          endDate: entry.endDate || undefined,
          sites: entry.sites,
          notes: entry.notes || "",
        };
        const updated = [newEntry, ...existing];
        localStorage.setItem(storageKey, JSON.stringify(updated));
        // Update global
        updateLocalGlobal(entry.campgroundId, updated);
        setLocalVisits((prev) => [{ ...entry }, ...prev]);
      }
    },
    [isAuthenticated, addMutation]
  );

  // Delete a visit
  const deleteVisit = useCallback(
    async (entry: VisitedEntry, index?: number) => {
      if (isAuthenticated && entry.id) {
        await deleteMutation.mutateAsync({ id: entry.id });
      } else {
        // localStorage fallback
        const storageKey = `camp_visited_${entry.campgroundId}`;
        const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
        if (index !== undefined) {
          existing.splice(index, 1);
        } else {
          // Find by date match
          const idx = existing.findIndex(
            (e: any) => e.date === entry.startDate && e.sites === entry.sites
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
      }
    },
    [isAuthenticated, deleteMutation]
  );

  const loading = authLoading || (isAuthenticated && dbQuery.isLoading);

  return {
    visits,
    loading,
    isAuthenticated,
    getVisitsForCampground,
    addVisit,
    deleteVisit,
    refetch: dbQuery.refetch,
  };
}

function updateLocalGlobal(campgroundId: number, entries: any[]) {
  try {
    const globalKey = "camp_visited_global";
    const global = JSON.parse(localStorage.getItem(globalKey) || "{}");
    if (entries.length > 0) {
      const last = entries[0];
      const dateDisplay = last.endDate
        ? `${last.date} ~ ${last.endDate}`
        : last.date;
      global[campgroundId] = {
        count: entries.length,
        lastVisit: dateDisplay,
        lastSites: last.sites || "",
      };
    } else {
      delete global[campgroundId];
    }
    localStorage.setItem(globalKey, JSON.stringify(global));
  } catch {}
}
