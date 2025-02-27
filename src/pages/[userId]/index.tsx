import FollowSectionCard from "@/components/UserProfile/FollowSectionCard";
import GistsCard from "@/components/UserProfile/GistsCard";
import Header from "@/components/UserProfile/Header";
import ProfileCard from "@/components/UserProfile/ProfileCard";
import RepositoriesCard from "@/components/UserProfile/RepositoriesCard";
import Template from "@/components/templates/Template";
import {
  fetchGitHubUser,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserGists,
  fetchUserRepositories,
} from "@/services/GithubApi";
import {
  GHUserGistType,
  GHUserRepositoryType,
  GitHubUserType,
} from "@/types/GitHubUser";
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
        <Header user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileCard user={user} />
          <div className="lg:col-span-2 space-y-6">
            <RepositoriesCard repositories={repositories} />
            <FollowSectionCard
              follows={followers}
              title="Followers"
              fallbackMessage="No followers found"
            />
            <FollowSectionCard
              follows={following}
              title="Following"
              fallbackMessage="Not following anyone"
            />
            <GistsCard gists={gists} />
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
    const [user, repositories, followers, following, gists] = await Promise.all(
      [
        fetchGitHubUser(userId),
        fetchUserRepositories(userId),
        fetchUserFollowers(userId),
        fetchUserFollowing(userId),
        fetchUserGists(userId),
      ]
    );

    return {
      props: {
        user,
        repositories,
        followers,
        following,
        gists,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      props: {
        errorMessage,
      },
    };
  }
}
