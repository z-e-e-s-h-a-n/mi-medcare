"use client";

import BlogCard from "@/components/blogs/BlogCard";
import BlogSidebar from "@/components/blogs/BlogSidebar";
import { PageHeader } from "@/components/layout/page-header";
import { usePosts } from "@/hooks/content";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { BookOpen, CalendarDays, TrendingUp } from "lucide-react";

export default function BlogsPageClient() {
  const { data, isLoading } = usePosts();

  const allPosts = data?.posts || [];
  const featuredPosts = allPosts.slice(0, 2);
  const recentPosts = allPosts.slice(2);
  const hasPosts = allPosts.length > 0;

  return (
    <>
      <PageHeader
        subtitle="blogs"
        title="Welcome to Our Blog"
        description="Discover insightful articles, tutorials, and updates from our team of experts in web development and design."
        imageUrl="https://img.freepik.com/free-photo/medical-equipment_53876-24740.jpg?t=st=1773944403~exp=1773948003~hmac=b9a80ce75758202274e10696f1ea592452bb5d13891a6ac76efb8e19a181393b&w=1060"
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

      <section className="section-wrapper">
        <div className="section-container grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {!isLoading && !hasPosts ? (
              <section className="rounded-3xl border border-dashed bg-muted/30 px-6 py-16 text-center">
                <BookOpen className="mx-auto h-14 w-14 text-muted-foreground" />
                <h2 className="mt-6 text-3xl font-bold">
                  No blogs published yet
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                  We do not have any published blog posts right now. Once new
                  articles go live, they will appear here with featured posts,
                  latest updates, and topic navigation.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button href="/" variant="outline">
                    Back to Home
                  </Button>
                  <Button href="/contact">Contact Us</Button>
                </div>
              </section>
            ) : (
              <>
                <section id="featured">
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-3xl font-bold">
                      <TrendingUp className="h-6 w-6" />
                      Featured Posts
                    </h2>
                    <Button href="/blogs?category=featured" variant="secondary">
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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

                <section id="latest">
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-3xl font-bold">
                      <CalendarDays className="h-6 w-6" />
                      Latest Posts
                    </h2>
                    <Button href="/blogs/archive" variant="secondary">
                      View Archive
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                      <div className="col-span-2 rounded-2xl border border-dashed bg-muted/20 px-6 py-10 text-center">
                        <p className="text-muted-foreground">
                          No additional posts are available yet.
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {data?.totalPages && data.totalPages > 1 && (
                  <div className="pt-8 text-center">
                    <Button size="lg" variant="outline">
                      Load More Posts
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <BlogSidebar recentPosts={recentPosts} />
          </div>
        </div>
      </section>
    </>
  );
}
