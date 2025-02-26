import Template from "@/components/templates/Template";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchGitHubUsers, searchGitHubUsers } from "@/services/GithubApi";
import { GitHubUser } from "@/types/GitHubUser";
import { debounce } from "@/utils";
import { useRouter } from "next/router";
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
  const router = useRouter();

  console.log(users[0]);

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
    <Template>
      <div className="relative w-64">
        <Input
          type="search"
          placeholder="Search users..."
          className="pr-10"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {errorMessage && toast(errorMessage)}
        {searchError && toast(searchError)}
        {isSearching ? (
          <span>Searching...</span>
        ) : users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id} onClick={() => router.push(`/${user.login}`)}>
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
        error,
        errorMessage: "There was an error fetching the users",
      },
    };
  }
}
