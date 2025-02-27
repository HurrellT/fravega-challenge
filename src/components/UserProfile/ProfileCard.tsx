import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GitHubUserType } from "@/types/GitHubUser";
import { MapPin } from "lucide-react";
import Link from "next/link";

const ProfileCard = ({ user }: { user: GitHubUserType }) => {
  return (
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
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {user.blog}
                </Link>
              </div>
            )}
            {user.twitter_username && (
              <div>
                <span className="font-semibold">Twitter:</span> @
                {user.twitter_username}
              </div>
            )}
            <div>
              <span className="font-semibold">Public repos:</span>{" "}
              {user.public_repos}
            </div>
            <div>
              <span className="font-semibold">Public gists:</span>{" "}
              {user.public_gists}
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
  );
};

export default ProfileCard;
