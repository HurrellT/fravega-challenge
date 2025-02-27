import { FavoriteButton } from "@/components/FavoriteButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GitHubUserType } from "@/types/GitHubUser";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const Header = ({ user }: { user: GitHubUserType }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback>
            {user.login.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
          <p className="text-gray-500">@{user.login}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github size={18} />
            GitHub
            <ExternalLink size={14} />
          </Link>
        </Button>
        <FavoriteButton user={user} />
      </div>
    </div>
  );
};

export default Header;
