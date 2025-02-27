import { UserCard } from "@/components/UserCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubUserType } from "@/types/GitHubUser";

const FollowSectionCard = ({
  follows,
  title,
  fallbackMessage,
}: {
  follows: GitHubUserType[];
  title: string;
  fallbackMessage: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {follows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {follows.map((follower) => (
              <div className="flex justify-center" key={follower.id}>
                <UserCard user={follower} />
              </div>
            ))}
          </div>
        ) : (
          <p>{fallbackMessage}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowSectionCard;
