"use client";

import Link from "next/link";
import { ArrowUpRight, FileText, FolderTree, Tag } from "lucide-react";

import type { DashboardResponse } from "@workspace/contracts/dashboard";
import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

interface ContentOverviewProps {
  data: DashboardResponse["contentOverview"];
}

const ContentOverview = ({ data }: ContentOverviewProps) => {
  const maxPostViews = Math.max(
    ...data.posts.map((post) => post.viewsCount),
    1,
  );
  const maxCategoryCount = Math.max(
    ...data.categories.map((category) => category.postCount),
    1,
  );
  const maxTagCount = Math.max(...data.tags.map((tag) => tag.postCount), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Overview</CardTitle>
        <CardDescription>
          Top content performance across posts, categories, and tags.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-muted-foreground" />
              <h4 className="font-semibold">Top Posts</h4>
            </div>
            <div className="space-y-3 max-h-105 overflow-y-auto pr-1">
              {data.posts.map((post, index) => {
                const percentage = Math.round(
                  (post.viewsCount / maxPostViews) * 100,
                );

                return (
                  <Link
                    key={post.id}
                    href={`/admin/content/posts/${post.id}`}
                    className="block rounded-xl border bg-card/70 p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <Badge variant="secondary">#{index + 1}</Badge>
                          <Badge variant="outline" className="capitalize">
                            {post.status}
                          </Badge>
                        </div>
                        <div className="truncate font-medium">{post.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {post.categoryName} • {post.authorName}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{post.viewsCount.toLocaleString()} views</span>
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>
                    <Progress
                      value={percentage}
                      className="mt-3 h-2 rounded-lg"
                    />
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="flex items-center gap-2">
              <FolderTree className="size-4 text-muted-foreground" />
              <h4 className="font-semibold">Top Categories</h4>
            </div>
            <div className="space-y-3 max-h-105 overflow-y-auto pr-1">
              {data.categories.map((category) => {
                const percentage = Math.round(
                  (category.postCount / maxCategoryCount) * 100,
                );

                return (
                  <Link
                    key={category.id}
                    href={`/admin/content/categories/${category.id}`}
                    className="block rounded-xl border bg-card/70 p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-medium">{category.name}</div>
                        <div className="font-mono text-xs text-muted-foreground">
                          /{category.slug}
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {category.postCount} posts
                      </Badge>
                    </div>
                    <Progress
                      value={percentage}
                      className="mt-3 h-2 rounded-lg"
                    />
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="tags" className="space-y-4">
            <div className="flex items-center gap-2">
              <Tag className="size-4 text-muted-foreground" />
              <h4 className="font-semibold">Popular Tags</h4>
            </div>
            <div className="grid gap-3 max-h-105 overflow-y-auto pr-1 md:grid-cols-2">
              {data.tags.map((tag) => {
                const percentage = Math.round(
                  (tag.postCount / maxTagCount) * 100,
                );

                return (
                  <Link
                    key={tag.id}
                    href={`/admin/content/tags/${tag.id}`}
                    className="block rounded-xl border bg-card/70 p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          #{tag.name}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                          /{tag.slug}
                        </div>
                      </div>
                      <Badge variant="outline">{tag.postCount} posts</Badge>
                    </div>
                    <Progress value={percentage} className="h-2 rounded-lg" />
                  </Link>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentOverview;
