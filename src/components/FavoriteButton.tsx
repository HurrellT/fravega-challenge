import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";
import { GitHubUser } from "@/types/GitHubUser";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

interface FavoriteButtonProps {
  user: GitHubUser;
  className?: string;
}

export function FavoriteButton({ user, className }: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isUserFavorite = isFavorite(user.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isUserFavorite) {
      removeFromFavorites(user.id);
    } else {
      addToFavorites(user);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        className,
        isUserFavorite
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground hover:text-red-400"
      )}
      onClick={handleToggleFavorite}
      aria-label={isUserFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className="h-4 w-4"
        fill={isUserFavorite ? "currentColor" : "none"}
      />
    </Button>
  );
}
