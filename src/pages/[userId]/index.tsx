import { FavoriteButton } from "@/components/FavoriteButton";
import Template from "@/components/templates/Template";
import { fetchGitHubUser } from "@/services/GithubApi";
import { GitHubUser } from "@/types/GitHubUser";
import { toast } from "sonner";

export default function UserDetails({
  user,
  errorMessage,
}: {
  user: GitHubUser;
  errorMessage?: string;
}) {
  if (errorMessage) {
    toast.error(errorMessage);
    return <Template>Error loading user details</Template>;
  }

  if (!user) {
    return <Template>Loading...</Template>;
  }

  return (
    <Template>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{user.login}</h1>
        <FavoriteButton user={user} />
      </div>
      <div>
        {JSON.stringify(user)}
      </div>
    </Template>
  );
}

export async function getServerSideProps(context: {
  params: { userId: string };
}) {
  const { userId } = context.params;
  try {
    const user = await fetchGitHubUser(userId);

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
        errorMessage: "There was an error fetching the user",
      },
    };
  }
}
