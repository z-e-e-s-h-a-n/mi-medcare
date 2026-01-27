import { Badge } from "@components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import Link from "next/link";

interface RecentPostsProps {
  data: DashboardData["recentPosts"];
}

const RecentPosts = ({ data }: RecentPostsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
        <CardDescription>Latest content activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((post) => (
            <Link
              key={post.id}
              href={post.slug}
              className="flex items-center justify-between border-b pb-3 last:border-0"
            >
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-muted-foreground">
                  By {post.author.displayName} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    post.status === "published" ? "default" : "secondary"
                  }
                >
                  {post.status}
                </Badge>
                {post.views > 0 && (
                  <span className="text-sm">
                    {post.views.toLocaleString()} views
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPosts;
