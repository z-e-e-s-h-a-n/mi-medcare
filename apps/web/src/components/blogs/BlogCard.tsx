import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, Sparkles } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import type { PostResponse } from "@workspace/contracts/content";
import { estimateReadTime } from "@/lib/utils";
import { formatDate } from "@workspace/shared/utils";

interface BlogCardProps {
  post: PostResponse;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

const BlogCard = ({ post, variant = "featured", className }: BlogCardProps) => {
  const isFeaturedPost = post.category.name.includes("Featured");

  if (variant === "compact") {
    return (
      <Link href={`/blogs/${post.slug}`}>
        <Card
          className={cn(
            "hover:shadow-md transition-shadow p-4",
            isFeaturedPost && "ring-1 ring-primary/30 bg-primary/5",
            className,
          )}
        >
          <div className="flex items-start gap-4">
            {post.cover && (
              <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden">
                <Image
                  src={post.cover.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {post.title}
                </h3>
                {isFeaturedPost && (
                  <Badge variant="secondary" className="shrink-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {post.publishedAt ? formatDate(post.publishedAt) : "-"}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {estimateReadTime(post.content)} min
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/blogs/${post.slug}`}>
      <Card
        className={cn(
          "group hover:shadow-lg transition-all duration-300 overflow-hidden p-0",
          isFeaturedPost &&
            "ring-1 ring-primary/30 shadow-md bg-linear-to-b from-primary/5 to-background",
          className,
        )}
      >
        {post.cover && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.cover.url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center justify-between gap-2 w-[90%]">
              {post.category && (
                <Badge className="bg-white/90 text-black hover:bg-white">
                  {post.category.name}
                </Badge>
              )}

              {isFeaturedPost && (
                <Badge className="bg-primary text-primary-foreground">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>
        )}

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {post.publishedAt ? formatDate(post.publishedAt) : "-"}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {estimateReadTime(post.content)} min
            </span>
          </div>

          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>

          <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
