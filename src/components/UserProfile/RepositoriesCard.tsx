import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GHUserRepositoryType } from "@/types/GitHubUser";
import Link from "next/link";

const RepositoriesCard = ({
  repositories,
}: {
  repositories: GHUserRepositoryType[];
}) => {
  return (
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
                        <Badge variant="outline">
                          ⭐ {repo.stargazers_count}
                        </Badge>
                        <Badge variant="outline">🍴 {repo.forks_count}</Badge>
                      </div>
                    </div>
                    {repo.description && (
                      <p className="text-sm text-gray-600">
                        {repo.description}
                      </p>
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
  );
};

export default RepositoriesCard;
