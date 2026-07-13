import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

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
const MIGRATED_KEY = "camping-guide-favorites-migrated";

function loadFromStorage(key: string): number[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [compareList, setCompareList] = useState<number[]>(() => loadFromStorage(COMPARE_KEY));
  const [localFavorites, setLocalFavorites] = useState<number[]>(() => loadFromStorage(FAVORITES_KEY));

  // DB query for favorites (only when authenticated)
  const dbQuery = trpc.favorites.list.useQuery(undefined, {
    enabled: isAuthenticated,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const toggleMutation = trpc.favorites.toggle.useMutation({
    onSuccess: () => dbQuery.refetch(),
  });

  const bulkImportMutation = trpc.favorites.bulkImport.useMutation({
    onSuccess: () => dbQuery.refetch(),
  });

  // Auto-migrate localStorage favorites to DB on first login
  useEffect(() => {
    if (!isAuthenticated) return;
    if (dbQuery.isLoading) return;
    
    const alreadyMigrated = localStorage.getItem(MIGRATED_KEY);
    if (alreadyMigrated) return;

    const localFavs = loadFromStorage(FAVORITES_KEY);
    if (localFavs.length > 0) {
      bulkImportMutation.mutate(
        { campgroundIds: localFavs },
        {
          onSuccess: () => {
            localStorage.setItem(MIGRATED_KEY, "true");
            // Clear localStorage favorites after successful migration
            localStorage.removeItem(FAVORITES_KEY);
            setLocalFavorites([]);
          },
        }
      );
    } else {
      localStorage.setItem(MIGRATED_KEY, "true");
    }
  }, [isAuthenticated, dbQuery.isLoading]);

  // Unified favorites list
  const favorites = useMemo(() => {
    if (isAuthenticated && dbQuery.data) {
      return dbQuery.data;
    }
    return localFavorites;
  }, [isAuthenticated, dbQuery.data, localFavorites]);

  // Persist compare list to localStorage
  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
  }, [compareList]);

  // Persist local favorites to localStorage (only when not authenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(localFavorites));
    }
  }, [localFavorites, isAuthenticated]);

  const toggleFavorite = useCallback(
    (id: number) => {
      if (isAuthenticated) {
        toggleMutation.mutate({ campgroundId: id });
      } else {
        setLocalFavorites((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
      }
    },
    [isAuthenticated, toggleMutation]
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

  const loading = authLoading || (isAuthenticated && dbQuery.isLoading);

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
