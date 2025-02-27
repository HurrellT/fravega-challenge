import { FavoriteButton } from "@/components/FavoriteButton";
import { UserCard } from "@/components/UserCard";
import Template from "@/components/templates/Template";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  fetchGitHubUser, 
  fetchUserFollowers, 
  fetchUserFollowing, 
  fetchUserGists, 
  fetchUserRepositories 
} from "@/services/GithubApi";
import { GHUserGistType, GitHubUserType, GHUserRepositoryType } from "@/types/GitHubUser";
import { ExternalLink, Github, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

interface UserDetailsProps {
  user: GitHubUserType;
  repositories: GHUserRepositoryType[];
  followers: GitHubUserType[];
  following: GitHubUserType[];
  gists: GHUserGistType[];
  errorMessage?: string;
}

export default function UserDetails({
  user,
  repositories,
  followers,
  following,
  gists,
  errorMessage,
}: UserDetailsProps) {
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  if (errorMessage) {
    return <Template>Error loading user details</Template>;
  }

  if (!user) {
    return <Template>Loading...</Template>;
  }

  return (
    <Template>
      <div className="container mx-auto px-4 py-6 min-w-[320px] max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
              <p className="text-gray-500">@{user.login}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link href={user.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={18} />
                GitHub
                <ExternalLink size={14} />
              </Link>
            </Button>
            <FavoriteButton user={user} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.bio && <p className="text-sm">{user.bio}</p>}
                
                {user.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </div>
                )}

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{user.followers}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{user.following}</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  {user.company && (
                    <div>
                      <span className="font-semibold">Company:</span> {user.company}
                    </div>
                  )}
                  {user.blog && (
                    <div>
                      <span className="font-semibold">Website:</span>{" "}
                      <Link 
                        href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} 
                        target="_blank" 
                        className="text-blue-500 hover:underline"
                      >
                        {user.blog}
                      </Link>
                    </div>
                  )}
                  {user.twitter_username && (
                    <div>
                      <span className="font-semibold">Twitter:</span>{" "}
                      @{user.twitter_username}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold">Public repos:</span> {user.public_repos}
                  </div>
                  <div>
                    <span className="font-semibold">Public gists:</span> {user.public_gists}
                  </div>
                  {user.created_at && (
                    <div>
                      <span className="font-semibold">Joined:</span>{" "}
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Latest Repositories</CardTitle>
              </CardHeader>
              <CardContent>
                {repositories.length > 0 ? (
                  <div className="space-y-4">
                    {repositories.map((repo) => (
                      <Card key={repo.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                              <Link
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline font-medium"
                              >
                                {repo.name}
                              </Link>
                              <div className="flex gap-2">
                                <Badge variant="outline">⭐ {repo.stargazers_count}</Badge>
                                <Badge variant="outline">🍴 {repo.forks_count}</Badge>
                              </div>
                            </div>
                            {repo.description && (
                              <p className="text-sm text-gray-600">{repo.description}</p>
                            )}
                            {repo.language && (
                              <Badge className="w-fit">{repo.language}</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p>No repositories found</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Followers</CardTitle>
              </CardHeader>
              <CardContent>
                {followers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {followers.map((follower) => (
                      <UserCard key={follower.id} user={follower} />
                    ))}
                  </div>
                ) : (
                  <p>No followers found</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Following</CardTitle>
              </CardHeader>
              <CardContent>
                {following.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {following.map((follow) => (
                      <UserCard key={follow.id} user={follow} />
                    ))}
                  </div>
                ) : (
                  <p>Not following anyone</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Latest Gists</CardTitle>
              </CardHeader>
              <CardContent>
                {gists.length > 0 ? (
                  <div className="space-y-4">
                    {gists.map((gist) => (
                      <Card key={gist.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-2">
                            <Link
                              href={gist.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline font-medium"
                            >
                              {gist.description || 'Untitled Gist'}
                            </Link>
                            <div className="flex flex-wrap gap-2">
                              {Object.keys(gist.files || {}).map((filename) => (
                                <Badge key={filename} variant="outline">
                                  {filename}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">
                              Created: {new Date(gist.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p>No gists found</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Template>
  );
}

export async function getServerSideProps(context: {
  params: { userId: string };
}) {
  const { userId } = context.params;
  try {
    const [user, repositories, followers, following, gists] = await Promise.all([
      fetchGitHubUser(userId),
      fetchUserRepositories(userId),
      fetchUserFollowers(userId),
      fetchUserFollowing(userId),
      fetchUserGists(userId)
    ]);

    return {
      props: {
        user,
        repositories,
        followers,
        following,
        gists
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      props: {
        errorMessage,
      },
    };
  }
}
