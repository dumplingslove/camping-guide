import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface FavoritesContextType {
  favorites: number[];
  compareList: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  addToCompare: (id: number) => void;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  clearCompare: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const FAVORITES_KEY = "camping-guide-favorites";
const COMPARE_KEY = "camping-guide-compare";

function loadFromStorage(key: string): number[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => loadFromStorage(FAVORITES_KEY));
  const [compareList, setCompareList] = useState<number[]>(() => loadFromStorage(COMPARE_KEY));

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
  }, [compareList]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const addToCompare = (id: number) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 4) return prev; // max 4 for comparison
      return [...prev, id];
    });
  };

  const removeFromCompare = (id: number) => {
    setCompareList((prev) => prev.filter((x) => x !== id));
  };

  const isInCompare = (id: number) => compareList.includes(id);

  const clearCompare = () => setCompareList([]);

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
