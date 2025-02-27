import { UserCard } from "@/components/UserCard";
import Template from "@/components/templates/Template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/context/FavoritesContext";
import { fetchGitHubUsers, searchGitHubUsers } from "@/services/GithubApi";
import { GitHubUser } from "@/types/GitHubUser";
import { debounce } from "@/utils";
import { Heart } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Home({
  initialUsers,
  errorMessage,
}: {
  initialUsers: GitHubUser[];
  errorMessage?: string;
}) {
  const [users, setUsers] = useState<GitHubUser[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const { favorites, showFavoritesOnly, toggleShowFavorites } = useFavorites();

  // Show toast messages only after component mounts (client-side)
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (searchError) {
      toast.error(searchError);
    }
  }, [searchError]);

  const performSearch = useCallback(
    async (query: string) => {
      if (!query || query.length < 3) {
        setUsers(initialUsers);
        setIsSearching(false);
        setSearchError(null);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchGitHubUsers(query);
        setUsers(results);
        setSearchError(null);
      } catch (error) {
        setSearchError("Failed to search users");
        setUsers([]);
      } finally {
        setIsSearching(false);
      }
    },
    [initialUsers]
  );

  const debouncedSearch = useMemo(
    () => debounce(performSearch, 500),
    [performSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const displayedUsers = useMemo(() => {
    if (showFavoritesOnly) {
      return favorites.filter((user) =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return users;
  }, [users, favorites, showFavoritesOnly, searchTerm]);

  return (
    <Template>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          onClick={toggleShowFavorites}
          className="flex items-center gap-2"
        >
          <Heart
            className="h-4 w-4"
            fill={showFavoritesOnly ? "currentColor" : "none"}
          />
          {showFavoritesOnly ? "Show All Users" : "Show Favorites"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {isSearching ? (
          <span>Searching...</span>
        ) : displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <span>
            {showFavoritesOnly ? "No favorite users found" : "No users found"}
          </span>
        )}
      </div>
    </Template>
  );
}

export async function getServerSideProps() {
  try {
    const users = await fetchGitHubUsers();

    return {
      props: {
        initialUsers: users,
      },
    };
  } catch (error) {
    return {
      props: {
        initialUsers: [],
        errorMessage: error.message,
      },
    };
  }
}
