"use client";
import React from "react";

import Link from "next/link";
import { Tag } from "lucide-react";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import BlogSidebar from "@components/blog/BlogSidebar";
import { useTags } from "@hooks/tags";
import { Skeleton } from "@components/ui/skeleton";

const TagList = () => {
  const { data, isLoading } = useTags();
  const tags = data?.tags;

  const sortedTags =
    tags?.sort((a, b) => (b.posts?.length || 0) - (a.posts?.length || 0)) || [];

  const allTags = sortedTags;

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-linear-to-r from-primary/10 to-primary/5">
        <div className="px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Tag className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Blog{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Tags
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our content through tags. Find articles by specific topics,
            technologies, and interests.
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link href="/blogs">Back to Blog</Link>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* All Tags */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">All Tags</h2>
              <Badge variant="outline">{tags?.length || 0} tags</Badge>
            </div>

            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                  (i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full" />
                  ),
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag) => (
                  <Button
                    key={tag.id}
                    variant="outline"
                    size="lg"
                    className="h-auto py-3 px-6 rounded-full hover:scale-105 transition-transform"
                    asChild
                  >
                    <Link href={`/blogs/tags/${tag.slug}`}>
                      <Tag className="h-4 w-4 mr-2" />
                      {tag.name}
                      <Badge variant="secondary" className="ml-2">
                        {tag.posts?.length || 0}
                      </Badge>
                    </Link>
                  </Button>
                ))}
              </div>
            )}

            {!isLoading && allTags.length === 0 && (
              <div className="text-center py-12 border rounded-lg">
                <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tags yet</h3>
                <p className="text-muted-foreground mb-4">
                  Tags will appear here once they are added to posts.
                </p>
              </div>
            )}
          </section>

          {/* Tag Cloud Alternative View */}
          {!isLoading && allTags.length > 0 && (
            <section className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Tag Cloud</h3>
              <Card>
                <CardContent className="p-8">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {allTags.map((tag) => {
                      const postCount = tag.posts?.length || 0;
                      const size = Math.min(Math.max(postCount * 2, 12), 32);
                      return (
                        <Link
                          key={tag.id}
                          href={`/blogs/tags/${tag.slug}`}
                          className="inline-block transition-all hover:-translate-y-1"
                          style={{
                            fontSize: `${size}px`,
                            opacity: Math.min(postCount / 20 + 0.3, 1),
                          }}
                        >
                          <span className="font-medium hover:text-primary transition-colors">
                            {tag.name}
                          </span>
                        </Link>
                      );
                    })}
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

      {/* CTA Section */}
      <section>
        <div className="py-16 bg-linear-to-r from-primary/10 to-primary/5 mb-8 rounded-2xl">
          <div className="px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Use our search feature to find specific articles or browse through
              all posts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/blogs/search">Search Posts</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blogs">Browse All Posts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TagList;
