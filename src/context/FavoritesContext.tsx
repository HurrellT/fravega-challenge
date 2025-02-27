import { GitHubUser } from "@/types/GitHubUser";
import { createContext, useContext, useState, ReactNode } from "react";

interface FavoritesContextType {
  favorites: GitHubUser[];
  addToFavorites: (user: GitHubUser) => void;
  removeFromFavorites: (userId: number) => void;
  isFavorite: (userId: number) => boolean;
  showFavoritesOnly: boolean;
  toggleShowFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<GitHubUser[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const addToFavorites = (user: GitHubUser) => {
    setFavorites((prev) => [...prev, user]);
  };

  const removeFromFavorites = (userId: number) => {
    setFavorites((prev) => prev.filter((user) => user.id !== userId));
  };

  const isFavorite = (userId: number) => {
    return favorites.some((user) => user.id === userId);
  };

  const toggleShowFavorites = () => {
    setShowFavoritesOnly((prev) => !prev);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    showFavoritesOnly,
    toggleShowFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
