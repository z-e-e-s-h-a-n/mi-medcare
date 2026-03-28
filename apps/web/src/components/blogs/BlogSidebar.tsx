"use client";

import React from "react";
import Link from "next/link";
import { CalendarDays, Clock, Folder, Tag } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { useCategories } from "@/hooks/content";
import type { PostResponse, TagResponse } from "@workspace/contracts/content";
import { formatDate } from "@workspace/shared/utils";
import { estimateReadTime } from "@/lib/utils";

interface BlogSidebarProps {
  recentPosts?: PostResponse[];
  popularTags?: TagResponse[];
  className?: string;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  recentPosts,
  popularTags,
  className,
}) => {
  const { data, isLoading } = useCategories();
  const categories =
    data?.categories?.filter((category) => (category._count?.posts || 0) > 0) ||
    [];

  return (
    <aside className={cn("space-y-6 sticky top-24", className)}>
      {/* About Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About This Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Welcome to our blog! We share insights, tutorials, and updates about
            web development, design, and technology. Stay tuned for regular
            posts from our team of experts.
          </p>
          <Button
            href="#cta-section"
            variant="outline"
            size="sm"
            className="mt-4 w-full"
          >
            Subscribe to Newsletter
          </Button>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blogs/category/${category.slug}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category._count?.posts || 0}
                    </Badge>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No blog categories with published posts yet.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Posts */}
      {recentPosts && recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Recent Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group block"
                >
                  <div className="flex gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>
                          {post.publishedAt
                            ? formatDate(post.publishedAt)
                            : "-"}
                        </span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{estimateReadTime(post.content)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Tags */}
      {popularTags && popularTags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Popular Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Button
                  key={tag.id}
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8"
                >
                  <Link href={`/blogs/tag/${tag.slug}`}>
                    {tag.name}
                    {/* {tag.postCount && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({tag.postCount})
                      </span>
                    )} */}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  );
};

export default BlogSidebar;
