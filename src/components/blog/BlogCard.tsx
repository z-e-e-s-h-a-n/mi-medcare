// components/blogs/PostCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, Eye } from "lucide-react";
import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { cn, getReadTime } from "@utils/general";

interface PostCardProps {
  post: PostResponse;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  variant = "default",
  className,
}) => {
  const formatDate = (dateString: Date | null) => {
    if (!dateString) return;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (variant === "compact") {
    return (
      <Link href={`/blogs/${post.slug}`}>
        <Card className={cn("hover:shadow-md transition-shadow", className)}>
          <CardContent className="p-4">
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
                <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getReadTime(post.content)} min
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/blogs/${post.slug}`}>
        <Card
          className={cn(
            "group hover:shadow-lg transition-all duration-300 overflow-hidden",
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
              {post.category && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-black hover:bg-white">
                    {post.category.name}
                  </Badge>
                </div>
              )}
            </div>
          )}
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              {/* {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </span>
              )} */}
              {post.views && (
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.views.toLocaleString()} views
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </CardHeader>
          <CardFooter className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              {post.author && (
                <>
                  {post.author.image && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={post.author.image.url}
                        alt={post.author.displayName}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium">
                    {post.author.displayName}
                  </span>
                </>
              )}
            </div>
            <span className="text-sm text-primary font-medium">
              Read More →
            </span>
          </CardFooter>
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/blogs/${post.slug}`}>
      <Card
        className={cn(
          "group hover:shadow-lg transition-all duration-300 h-full",
          className,
        )}
      >
        {post.cover && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={post.cover.url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {post.category && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-white/90 text-black hover:bg-white">
                  {post.category.name}
                </Badge>
              </div>
            )}
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {formatDate(post.publishedAt)}
            </span>
            {/* {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime} min
              </span>
            )} */}
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={post.author.image.url}
                      alt={post.author.displayName}
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  </div>
                )}
                <span className="text-sm">{post.author.displayName}</span>
              </div>
            )}
            {post.views && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.views.toLocaleString()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
