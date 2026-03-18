"use client";
import React from "react";

import Link from "next/link";
import { Tag } from "lucide-react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useTags } from "@/hooks/content";
import BlogSidebar from "@/components/blogs/BlogSidebar";
import { PageHeader } from "@/components/layout/page-header";

export const TagListClient = () => {
  const { data, isLoading } = useTags();
  const tags = data?.tags;

  const sortedTags =
    tags?.sort((a, b) => (b._count?.posts || 0) - (a._count?.posts || 0)) || [];

  const allTags = sortedTags;

  return (
    <>
      <>
        <PageHeader
          subtitle={
            // TODO fix: this upper div styles not working
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/50 mb-6">
              <Tag className="h-8 w-8 text-primary" />
            </div>
          }
          title="Blog Tags"
          description="Explore our content through tags. Find articles by specific topics, technologies, and interests."
          actions={
            <Button href="/blogs" size="lg" variant="outline" asChild>
              Back to Blog
            </Button>
          }
        />

        {/* Main Content */}
        <section className="section-wrapper section-container grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                          {tag._count.posts || 0}
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
                        return (
                          <Link
                            key={tag.id}
                            href={`/blogs/tags/${tag.slug}`}
                            className="inline-block transition-all hover:-translate-y-1 text-sm text-muted-foreground"
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
      </>
    </>
  );
};
