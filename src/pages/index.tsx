import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchGitHubUsers, GitHubUser } from "@/services/GithubApi";
import Image from "next/image";

export default function Home({
  users,
  errorMessage,
}: {
  users: GitHubUser[];
  errorMessage?: string;
}) {
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
              // onChange implementation will be added later
            />
          </div>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex flex-col gap-8 items-center justify-center w-full py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {errorMessage && <span className="text-red-600">{errorMessage}</span>}
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex items-center gap-4 p-6">
                <Avatar>
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>{user.login}</CardTitle>
              </CardContent>
            </Card>
          ))}
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
        users
      },
    };
  } catch (error) {
    return {
      props: {
        users: [],
        error,
        errorMessage: "There was an error fetching the users",
      },
    };
  }
}
