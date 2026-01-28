"use client";

import Link from "next/link";
import { Button } from "@components/ui/button";
import { usePosts } from "@hooks/post";
import { Skeleton } from "@components/ui/skeleton";
import { CalendarDays, TrendingUp } from "lucide-react";
import PostCard from "@components/blog/BlogCard";
import BlogSidebar from "@components/blog/BlogSidebar";
import Newsletter from "@components/root/Newsletter";

const BlogList = () => {
  const { data, isLoading } = usePosts({
    status: "published",
    sortBy: "publishedAt",
    sortOrder: "desc",
    limit: 9,
  });

  const featuredPosts = data?.posts?.slice(0, 2) || [];
  const recentPosts = data?.posts?.slice(2) || [];

  return (
    <>
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden bg-linear-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Welcome to Our{" "}
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover insightful articles, tutorials, and updates from our team
              of experts in web development and design.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#featured">Read Featured</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#latest">Browse All</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Posts */}
            <section id="featured">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Featured Posts
                </h2>
                <Button variant="ghost" asChild>
                  <Link href="/blogs?category=featured">View All</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {isLoading ? (
                  <>
                    {[1, 2].map((i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    ))}
                  </>
                ) : (
                  featuredPosts.map((post) => (
                    <PostCard key={post.id} post={post} variant="featured" />
                  ))
                )}
              </div>
            </section>

            {/* Latest Posts */}
            <section id="latest">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <CalendarDays className="h-6 w-6" />
                  Latest Posts
                </h2>
                <Button variant="ghost" asChild>
                  <Link href="/blogs/archive">View Archive</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    ))}
                  </>
                ) : recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">
                      No posts published yet. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Load More */}
            {data?.totalPages && data.totalPages > 1 && (
              <div className="text-center pt-8">
                <Button size="lg" variant="outline">
                  Load More Posts
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar recentPosts={recentPosts} />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default BlogList;
