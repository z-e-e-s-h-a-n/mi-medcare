"use client";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Eye, User } from "lucide-react";

import type { PostResponse } from "@workspace/contracts/content";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { PageHeader } from "@/components/layout/page-header";
import { BlogSection } from "@/components/sections/blog-section";
import { PostViewTracker } from "@/components/sections/post-view-tracker";
import { estimateReadTime } from "@/lib/utils";

export function BlogPostPageClient({ post }: { post: PostResponse }) {
  return (
    <>
      <PageHeader
        title={post.title}
        badge={post.category.name}
        description={post.excerpt}
        imageUrl={post.cover?.url}
      />
      <PostViewTracker postId={post.id} />

      <section className="section-wrapper">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            <Button asChild variant="ghost" className="mb-6 px-0">
              <Link href="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to blogs
              </Link>
            </Button>

            <div className="mb-8 flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{post.category.name}</Badge>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recently published"}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {estimateReadTime(post.content)}
              </span>

              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {post.author.displayName}
              </span>

              {typeof post.viewsCount === "number" ? (
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {post.viewsCount.toLocaleString()} views
                </span>
              ) : null}
            </div>

            <article className="rounded-3xl border bg-background p-8 shadow-sm">
              <div className="prose prose-neutral max-w-none whitespace-pre-line dark:prose-invert">
                {post.content}
              </div>
            </article>
          </div>
        </div>
      </section>

      <BlogSection params={{ limit: 4 }} className="bg-muted" />
    </>
  );
}
