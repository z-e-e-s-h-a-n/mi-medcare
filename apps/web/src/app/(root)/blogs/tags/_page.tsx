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

  const allTags = sortedTags.filter((tag) => (tag._count?.posts || 0) > 0);

  return (
    <>
      <PageHeader
        subtitle={
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/50">
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

      <section className="section-wrapper section-container grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">All Tags</h2>
              <Badge variant="outline">{allTags.length} tags</Badge>
            </div>

            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-full" />
                ))}
              </div>
            ) : allTags.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag) => (
                  <Button
                    key={tag.id}
                    variant="outline"
                    size="lg"
                    className="h-auto rounded-full px-6 py-3 transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href={`/blogs/tags/${tag.slug}`}>
                      <Tag className="mr-2 h-4 w-4" />
                      {tag.name}
                      <Badge variant="secondary" className="ml-2">
                        {tag._count.posts || 0}
                      </Badge>
                    </Link>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed bg-muted/30 px-6 py-16 text-center">
                <Tag className="mx-auto h-14 w-14 text-muted-foreground" />
                <h3 className="mt-6 text-2xl font-bold">No blog tags yet</h3>
                <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                  Tags will appear here once published blog posts are tagged and
                  visible on the site.
                </p>
              </div>
            )}
          </section>

          {!isLoading && allTags.length > 0 && (
            <section className="mt-12">
              <h3 className="mb-6 text-2xl font-bold">Tag Cloud</h3>
              <Card>
                <CardContent className="p-8">
                  <div className="flex flex-wrap justify-center gap-4">
                    {allTags.map((tag) => {
                      return (
                        <Link
                          key={tag.id}
                          href={`/blogs/tags/${tag.slug}`}
                          className="inline-block text-sm text-muted-foreground transition-all hover:-translate-y-1"
                        >
                          <span className="font-medium transition-colors hover:text-primary">
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

        <div className="lg:col-span-1">
          <BlogSidebar />
        </div>
      </section>
    </>
  );
};
