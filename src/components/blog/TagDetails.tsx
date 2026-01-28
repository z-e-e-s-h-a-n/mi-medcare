"use client";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Tag, Hash, TrendingUp, Clock, Eye } from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { useTag } from "@hooks/tags";
import { usePosts } from "@hooks/post";
import { Card, CardContent } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";
import PostCard from "@components/blog/BlogCard";
import BlogSidebar from "@components/blog/BlogSidebar";
import TagSkeleton from "@components/skeleton/TagSkeleton";
import { formatNullDate } from "@utils/general";

const TagDetails = ({ slug }: BaseBlogPageProps) => {
  const { data: tag, isLoading: tagLoading } = useTag(slug);
  const { data: postsData, isLoading: postsLoading } = usePosts({
    status: "published",
    sortBy: "publishedAt",
    searchBy: "tags",
    search: slug,
    sortOrder: "desc",
    limit: 12,
  });

  if (tagLoading) {
    return <TagSkeleton />;
  }

  if (!tag) {
    notFound();
  }

  const posts = postsData?.posts || [];

  // Calculate tag stats
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
  const totalReadTime = posts.reduce(
    (sum, post) => sum + Math.ceil((post.content?.length || 0) / 1000),
    0,
  );
  const averageReadTime =
    posts.length > 0 ? Math.round(totalReadTime / posts.length) : 0;

  return (
    <>
      {/* Tag Header */}
      <section className="py-12 md:py-16 bg-linear-to-r from-primary/10 to-primary/5">
        <div className="px-4">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/blogs">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blogs/tags">Tags</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/blogs/tags/${tag.slug}`}>
                  {tag.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {tag.name}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary" className="gap-1">
                  <Hash className="h-4 w-4" />
                  {posts.length} post{posts.length !== 1 ? "s" : ""}
                </Badge>

                {posts.length > 0 && (
                  <>
                    <Badge variant="outline" className="gap-1">
                      <Eye className="h-3 w-3" />
                      {totalViews.toLocaleString()} total views
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />~{averageReadTime} min avg
                      read
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-xl text-muted-foreground max-w-3xl">
                Explore all blog posts tagged with{" "}
                <span className="font-semibold text-primary">#{tag.name}</span>.
                {posts.length > 0 && " Discover related content and insights."}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blogs/tags">
                <Tag className="h-4 w-4 mr-2" />
                All Tags
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Tag Stats */}
          {posts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Tag Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-blue-500/5 border-blue-200">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      {posts.length}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      Total Posts
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-500/5 border-green-200">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      {totalViews.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Total Views
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-500/5 border-purple-200">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-purple-700 mb-2">
                      {averageReadTime}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">
                      Avg Read Time
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-500/5 border-orange-200">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-orange-700 mb-2">
                      {(() => {
                        const dates = posts
                          .map((p) => new Date(p.publishedAt || ""))
                          .filter((d) => !isNaN(d.getTime()));
                        if (dates.length === 0) return "—";
                        const oldest = new Date(
                          Math.min(...dates.map((d) => d.getTime())),
                        );
                        return formatNullDate(oldest);
                      })()}
                    </div>
                    <div className="text-sm text-orange-600 font-medium">
                      Since
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Posts with this Tag */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                Posts tagged with &quot;{tag.name}&quot;
              </h2>
              <Badge variant="outline">
                {posts.length} post{posts.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            {postsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No posts with this tag
                </h3>
                <p className="text-muted-foreground mb-4">
                  There are no published posts tagged with &quot;{tag.name}
                  &quot; yet.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blogs">Browse All Posts</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/blogs/tags">Explore Other Tags</Link>
                  </Button>
                </div>
              </div>
            )}
          </section>

          {/* Related Tags (based on overlapping posts) */}
          {tag.posts && tag.posts.length > 0 && (
            <section className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Related Tags</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    {/* Get unique tags from all posts except the current tag */}
                    {(() => {
                      const allTags = tag.posts.flatMap(
                        (post) =>
                          post.tags?.filter((t) => t.id !== tag.id) || [],
                      );
                      const uniqueTags = Array.from(
                        new Map(allTags.map((tag) => [tag.id, tag])).values(),
                      );
                      return uniqueTags.slice(0, 10).map((relatedTag) => (
                        <Badge
                          key={relatedTag.id}
                          variant="outline"
                          className="py-2 px-4 text-sm"
                          asChild
                        >
                          <Link href={`/blogs/tags/${relatedTag.slug}`}>
                            #{relatedTag.name}
                          </Link>
                        </Badge>
                      ));
                    })()}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BlogSidebar />
        </div>
      </section>
    </>
  );
};

export default TagDetails;
