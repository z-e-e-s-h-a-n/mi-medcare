"use client";

import BlogCard from "@/components/blogs/BlogCard";
import BlogSidebar from "@/components/blogs/BlogSidebar";
import { PageHeader } from "@/components/layout/page-header";
import { usePosts } from "@/hooks/content";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { CalendarDays, TrendingUp } from "lucide-react";

export default function BlogsPageClient() {
  const { data, isLoading } = usePosts();

  const featuredPosts = data?.posts?.slice(0, 2) || [];
  const recentPosts = data?.posts?.slice(2) || [];

  return (
    <>
      <PageHeader
        subtitle="blogs"
        title="Welcome to Our Blog"
        description="Discover insightful articles, tutorials, and updates from our team of experts in web development and design."
        actions={
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="#featured" size="lg" asChild>
              Read Featured
            </Button>
            <Button href="#latest" size="lg" variant="outline" asChild>
              Browse All
            </Button>
          </div>
        }
      />

      {/* Main Content */}
      <section className="section-wrapper">
        <div className="section-container grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Posts */}
            <section id="featured">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Featured Posts
                </h2>
                <Button href="/blogs?category=featured" variant="secondary">
                  View All
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
                    <BlogCard key={post.id} post={post} />
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
                <Button href="/blogs/archive" variant="secondary">
                  View Archive
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <BlogCard key={post.id} post={post} />
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
    </>
  );
}
