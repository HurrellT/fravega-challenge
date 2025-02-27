import { UserCard } from "@/components/UserCard";
import Template from "@/components/templates/Template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/context/FavoritesContext";
import { fetchGitHubUsers, searchGitHubUsers } from "@/services/GithubApi";
import { GitHubUserType } from "@/types/GitHubUser";
import { debounce } from "@/lib/utils";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const USERS_PER_PAGE = 24;

export default function Home({
  initialUsers,
  errorMessage,
}: {
  initialUsers: GitHubUserType[];
  errorMessage?: string;
}) {
  const [users, setUsers] = useState<GitHubUserType[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { favorites, showFavoritesOnly, toggleShowFavorites } = useFavorites();

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

  const loadUsers = useCallback(async (page: number) => {
    if (searchTerm.length < 3) {
      setIsLoading(true);
      try {
        const results = await fetchGitHubUsers(page, USERS_PER_PAGE);
        setUsers(results);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 3) {
      loadUsers(currentPage);
    }
  }, [currentPage, loadUsers, searchTerm]);

  const performSearch = useCallback(
    async (query: string) => {
      if (!query || query.length < 3) {
        loadUsers(currentPage);
        setIsSearching(false);
        setSearchError(null);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchGitHubUsers(query, currentPage, USERS_PER_PAGE);
        setUsers(results);
        setSearchError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setSearchError("Failed to search users");
        setUsers([]);
      } finally {
        setIsSearching(false);
      }
    },
    [currentPage, loadUsers]
  );

  const debouncedSearch = useMemo(
    () => debounce(performSearch, 500),
    [performSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const displayedUsers = useMemo(() => {
    if (showFavoritesOnly) {
      return favorites.filter((user) =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return users;
  }, [users, favorites, showFavoritesOnly, searchTerm]);

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

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
          className="flex items-center justify-center gap-2 min-w-[160px]"
        >
          <Heart
            className="h-4 w-4"
            fill={showFavoritesOnly ? "currentColor" : "none"}
          />
          {showFavoritesOnly ? "Show All Users" : "Show Favorites"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mb-6">
        {isSearching || isLoading ? (
          <span className="min-w-72 w-full text-center">Loading...</span>
        ) : displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <span className="min-w-72 w-full text-center">
            {showFavoritesOnly ? "No favorite users found" : "No users found"}
          </span>
        )}
      </div>
      
      {!showFavoritesOnly && displayedUsers.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button 
            variant="outline" 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1 || isLoading || isSearching}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">Page {currentPage}</span>
          <Button 
            variant="outline" 
            onClick={goToNextPage}
            disabled={displayedUsers.length < USERS_PER_PAGE || isLoading || isSearching}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Template>
  );
}

export async function getServerSideProps() {
  try {
    const users = await fetchGitHubUsers(1, USERS_PER_PAGE);

    return {
      props: {
        initialUsers: users,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      props: {
        initialUsers: [],
        errorMessage,
      },
    };
  }
}
