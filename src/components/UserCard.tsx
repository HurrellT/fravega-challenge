import { FavoriteButton } from "@/components/FavoriteButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GitHubUserType } from "@/types/GitHubUser";
import { useRouter } from "next/router";

type UserCardProps = {
  user: GitHubUserType;
  showFavoriteButton?: boolean;
};

export const UserCard = ({ user, showFavoriteButton = true }: UserCardProps) => {
  const router = useRouter();

  return (
    <Card
      key={user.id}
      onClick={() => router.push(`/${user.login}`)}
      className="relative cursor-pointer hover:shadow-md transition-shadow w-72"
    >
      <CardContent className="flex items-center gap-4 p-6 justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>
              {user.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{user.login}</CardTitle>
        </div>
        {showFavoriteButton && <FavoriteButton user={user} />}
      </CardContent>
    </Card>
  );
};
