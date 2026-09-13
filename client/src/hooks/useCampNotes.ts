import { useAuth } from "@/_core/hooks/useAuth";
import { supabase, supabaseConfigured, appBaseUrl } from "@/lib/supabase";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface NoteEntry {
  id: string | number;
  text: string;
  date: string;
}

const NOTES_PREFIX = "camp_notes_";
const MIGRATED_KEY = "supabase_notes_migrated";

function noteStorageKey(campId: number) {
  return `${NOTES_PREFIX}${campId}`;
}

function readLocalNotes(campId: number): NoteEntry[] {
  try {
    const stored = localStorage.getItem(noteStorageKey(campId));
    return stored ? (JSON.parse(stored) as NoteEntry[]) : [];
  } catch {
    return [];
  }
}

async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {}
  // Fallback for browsers without async clipboard permission
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
}

/**
 * Family notes (家庭笔记) for one campground.
 * - Logged in (Supabase configured): stored in the camp_notes table, syncs across devices.
 * - Not logged in: localStorage fallback (existing camp_notes_{campId} key).
 * shareNote() creates a read-only share link snapshot in shared_notes.
 */
export function useCampNotes(campId: number, campName: string) {
  const { user, isAuthenticated } = useAuth();
  const [cloudNotes, setCloudNotes] = useState<NoteEntry[]>([]);
  const [localNotes, setLocalNotes] = useState<NoteEntry[]>(() => readLocalNotes(campId));
  const [sharedMap, setSharedMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const migratingRef = useRef(false);

  const cloudEnabled = supabaseConfigured && !!supabase && isAuthenticated && !!user;

  const noteKeyOf = useCallback(
    (note: NoteEntry) => (cloudEnabled ? `db:${note.id}` : `local:${note.id}`),
    [cloudEnabled]
  );

  const loadCloud = useCallback(async () => {
    if (!supabase || !user) return;
    const { data, error } = await supabase
      .from("camp_notes")
      .select("id, text, date")
      .eq("campground_id", campId)
      .order("created_at", { ascending: false });
    if (error) {
      console.warn("加载家庭笔记失败", error.message);
      return;
    }
    setCloudNotes(
      (data || []).map((r: any) => ({ id: r.id, text: r.text, date: r.date }))
    );
  }, [user, campId]);

  const loadSharedMap = useCallback(async () => {
    if (!supabase || !user) {
      setSharedMap({});
      return;
    }
    const { data, error } = await supabase
      .from("shared_notes")
      .select("token, note_key")
      .eq("campground_id", campId);
    if (error) {
      console.warn("加载分享状态失败", error.message);
      return;
    }
    const map: Record<string, string> = {};
    for (const r of data || []) {
      if (r.note_key) map[r.note_key as string] = r.token as string;
    }
    setSharedMap(map);
  }, [user, campId]);

  // Initial load + one-time migration of every local camp_notes_* key
  useEffect(() => {
    let cancelled = false;
    setLocalNotes(readLocalNotes(campId));
    (async () => {
      setLoading(true);
      if (cloudEnabled && supabase && user && !migratingRef.current) {
        migratingRef.current = true;
        try {
          if (!localStorage.getItem(MIGRATED_KEY)) {
            const rows: { user_id: string; campground_id: number; text: string; date: string }[] = [];
            try {
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key || !key.startsWith(NOTES_PREFIX)) continue;
                const id = parseInt(key.replace(NOTES_PREFIX, ""), 10);
                if (isNaN(id)) continue;
                const stored = JSON.parse(localStorage.getItem(key) || "[]") as NoteEntry[];
                for (const n of stored) {
                  if (!n.text) continue;
                  rows.push({ user_id: user.id, campground_id: id, text: n.text, date: n.date || "" });
                }
              }
            } catch {}
            if (rows.length > 0) {
              const { error } = await supabase.from("camp_notes").insert(rows);
              if (!error) {
                localStorage.setItem(MIGRATED_KEY, "true");
                // Clear all local note keys after successful migration
                const toRemove: string[] = [];
                try {
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith(NOTES_PREFIX)) toRemove.push(key);
                  }
                } catch {}
                toRemove.forEach((k) => localStorage.removeItem(k));
                if (!cancelled) setLocalNotes([]);
              } else {
                console.warn("家庭笔记迁移失败", error.message);
              }
            } else {
              localStorage.setItem(MIGRATED_KEY, "true");
            }
          }
          if (!cancelled) {
            await loadCloud();
            await loadSharedMap();
          }
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
  }, [cloudEnabled, campId]);

  const notes: NoteEntry[] = useMemo(
    () => (cloudEnabled ? cloudNotes : localNotes),
    [cloudEnabled, cloudNotes, localNotes]
  );

  const addNote = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const date = new Date().toLocaleDateString("zh-CN");
      if (cloudEnabled && supabase && user) {
        const { error } = await supabase.from("camp_notes").insert({
          user_id: user.id,
          campground_id: campId,
          text: trimmed,
          date,
        });
        if (error) throw new Error(error.message);
        await loadCloud();
        return;
      }
      const entry: NoteEntry = { id: Date.now().toString(), text: trimmed, date };
      const updated = [entry, ...readLocalNotes(campId)];
      localStorage.setItem(noteStorageKey(campId), JSON.stringify(updated));
      setLocalNotes(updated);
    },
    [cloudEnabled, user, campId, loadCloud]
  );

  const deleteNote = useCallback(
    async (id: string | number) => {
      if (cloudEnabled && supabase) {
        const { error } = await supabase.from("camp_notes").delete().eq("id", id);
        if (error) throw new Error(error.message);
        // Also drop any share links pointing at this note
        const key = `db:${id}`;
        const token = sharedMap[key];
        if (token && user) {
          await supabase.from("shared_notes").delete().eq("token", token).eq("user_id", user.id);
          setSharedMap((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
          });
        }
        await loadCloud();
        return;
      }
      const updated = readLocalNotes(campId).filter((n) => n.id !== id);
      localStorage.setItem(noteStorageKey(campId), JSON.stringify(updated));
      setLocalNotes(updated);
    },
    [cloudEnabled, campId, loadCloud, sharedMap, user]
  );

  /** Create a share link snapshot for a note; returns the share URL (already copied to clipboard). */
  const shareNote = useCallback(
    async (note: NoteEntry): Promise<string> => {
      if (!cloudEnabled || !supabase || !user) {
        throw new Error("请先登录再分享笔记");
      }
      const key = noteKeyOf(note);
      const existing = sharedMap[key];
      const token = existing || crypto.randomUUID();
      if (!existing) {
        const { error } = await supabase.from("shared_notes").insert({
          token,
          user_id: user.id,
          campground_id: campId,
          campground_name: campName,
          note_key: key,
          note_text: note.text,
          note_date: note.date,
        });
        if (error) throw new Error(error.message);
        setSharedMap((prev) => ({ ...prev, [key]: token }));
      }
      const url = `${appBaseUrl()}shared/${token}`;
      await copyToClipboard(url);
      return url;
    },
    [cloudEnabled, user, campId, campName, noteKeyOf, sharedMap]
  );

  const unshareNote = useCallback(
    async (note: NoteEntry) => {
      if (!cloudEnabled || !supabase || !user) return;
      const key = noteKeyOf(note);
      const token = sharedMap[key];
      if (!token) return;
      const { error } = await supabase
        .from("shared_notes")
        .delete()
        .eq("token", token)
        .eq("user_id", user.id);
      if (error) throw new Error(error.message);
      setSharedMap((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [cloudEnabled, user, noteKeyOf, sharedMap]
  );

  return {
    notes,
    loading,
    isAuthenticated,
    addNote,
    deleteNote,
    shareNote,
    unshareNote,
    sharedMap,
    noteKeyOf,
    copyToClipboard,
  };
}
