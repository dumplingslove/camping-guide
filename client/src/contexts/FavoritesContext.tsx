import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, type ReactNode } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { supabase, supabaseConfigured } from "@/lib/supabase";

interface FavoritesContextType {
  favorites: number[];
  compareList: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  addToCompare: (id: number) => void;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  clearCompare: () => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const FAVORITES_KEY = "camping-guide-favorites";
const COMPARE_KEY = "camping-guide-compare";
const MIGRATED_KEY = "supabase_favorites_migrated";

function loadFromStorage(key: string): number[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [compareList, setCompareList] = useState<number[]>(() => loadFromStorage(COMPARE_KEY));
  const [localFavorites, setLocalFavorites] = useState<number[]>(() => loadFromStorage(FAVORITES_KEY));
  const [cloudFavorites, setCloudFavorites] = useState<number[]>([]);
  const [cloudLoading, setCloudLoading] = useState(false);
  const migratingRef = useRef(false);

  const cloudEnabled = supabaseConfigured && !!supabase && isAuthenticated && !!user;

  const loadCloud = useCallback(async () => {
    if (!supabase || !user) return;
    setCloudLoading(true);
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("campground_id");
      if (error) {
        console.warn("加载收藏失败", error.message);
        return;
      }
      setCloudFavorites((data || []).map((r: any) => r.campground_id as number));
    } finally {
      setCloudLoading(false);
    }
  }, [user]);

  // Initial load + one-time migration of localStorage favorites
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!cloudEnabled || !supabase || !user || migratingRef.current) return;
      migratingRef.current = true;
      try {
        if (!localStorage.getItem(MIGRATED_KEY)) {
          const localFavs = loadFromStorage(FAVORITES_KEY);
          if (localFavs.length > 0) {
            const rows = localFavs.map((campgroundId) => ({
              user_id: user.id,
              campground_id: campgroundId,
            }));
            const { error } = await supabase
              .from("favorites")
              .upsert(rows, { onConflict: "user_id,campground_id" });
            if (!error) {
              localStorage.setItem(MIGRATED_KEY, "true");
              localStorage.removeItem(FAVORITES_KEY);
              if (!cancelled) setLocalFavorites([]);
            } else {
              console.warn("收藏迁移失败", error.message);
            }
          } else {
            localStorage.setItem(MIGRATED_KEY, "true");
          }
        }
        if (!cancelled) await loadCloud();
      } finally {
        migratingRef.current = false;
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloudEnabled]);

  // Unified favorites list
  const favorites = useMemo(() => {
    if (cloudEnabled) return cloudFavorites;
    return localFavorites;
  }, [cloudEnabled, cloudFavorites, localFavorites]);

  // Persist compare list to localStorage
  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
  }, [compareList]);

  // Persist local favorites to localStorage (only when not authenticated)
  useEffect(() => {
    if (!cloudEnabled) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(localFavorites));
    }
  }, [localFavorites, cloudEnabled]);

  const toggleFavorite = useCallback(
    (id: number) => {
      if (cloudEnabled && supabase && user) {
        (async () => {
          if (cloudFavorites.includes(id)) {
            const { error } = await supabase
              .from("favorites")
              .delete()
              .eq("user_id", user.id)
              .eq("campground_id", id);
            if (error) {
              console.warn("取消收藏失败", error.message);
              return;
            }
            setCloudFavorites((prev) => prev.filter((x) => x !== id));
          } else {
            const { error } = await supabase
              .from("favorites")
              .upsert({ user_id: user.id, campground_id: id }, { onConflict: "user_id,campground_id" });
            if (error) {
              console.warn("收藏失败", error.message);
              return;
            }
            setCloudFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
          }
        })();
      } else {
        setLocalFavorites((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
      }
    },
    [cloudEnabled, user, cloudFavorites]
  );

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  const addToCompare = useCallback((id: number) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id: number) => {
    setCompareList((prev) => prev.filter((x) => x !== id));
  }, []);

  const isInCompare = useCallback(
    (id: number) => compareList.includes(id),
    [compareList]
  );

  const clearCompare = useCallback(() => setCompareList([]), []);

  const loading = authLoading || (cloudEnabled && cloudLoading);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        compareList,
        toggleFavorite,
        isFavorite,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
