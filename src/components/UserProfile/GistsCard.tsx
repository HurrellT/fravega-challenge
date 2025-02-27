import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GHUserGistType } from "@/types/GitHubUser";
import Link from "next/link";

const GistsCard = ({ gists }: { gists: GHUserGistType[] }) => {
  return (
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
                      {gist.description || "Untitled Gist"}
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
  );
};

export default GistsCard;
