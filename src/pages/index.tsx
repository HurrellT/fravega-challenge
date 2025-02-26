import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchGitHubUsers, searchGitHubUsers } from "@/services/GithubApi";
import { GitHubUser } from "@/types/GitHubUser";
import { debounce } from "@/utils";
import Image from "next/image";
import { useCallback, useEffect, useState, useMemo } from "react";

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

  return (
    <div>
      <header className="flex items-center justify-between w-full px-4 h-16 border-b dark:border-grey-500 light:border-grey-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">GitHub Users</h1>
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search users..."
              className="pr-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex flex-col gap-8 items-center justify-center w-full py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {errorMessage && <span className="text-red-600">{errorMessage}</span>}
          {searchError && <span className="text-red-600">{searchError}</span>}
          {isSearching ? (
            <span>Searching...</span>
          ) : users.length > 0 ? (
            users.map((user) => (
              <Card key={user.id}>
                <CardContent className="flex items-center gap-4 p-6">
                  <Avatar>
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.login}</CardTitle>
                </CardContent>
              </Card>
            ))
          ) : (
            <span>No users found</span>
          )}
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://fravega.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Fravega Tech Challenge
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://hurrellt.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Tomás Hurrell 2025
        </a>
      </footer>
    </div>
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
        error,
        errorMessage: "There was an error fetching the users",
      },
    };
  }
}
