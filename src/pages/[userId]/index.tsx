import Template from "@/components/templates/Template";
import { fetchGitHubUser } from "@/services/GithubApi";
import { GitHubUser } from "@/types/GitHubUser";

export default function UserDetails({
  user,
  errorMessage,
}: {
  user: GitHubUser;
  errorMessage?: string;
}) {
  return <Template>{JSON.stringify(user)}</Template>;
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
