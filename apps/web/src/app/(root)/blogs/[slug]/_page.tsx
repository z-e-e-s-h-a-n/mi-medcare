"use client";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { PostResponse } from "@workspace/contracts/content";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { RichContent } from "@workspace/ui/components/rich-content";

import Image from "next/image";
import { CalendarDays, Share2, Bookmark, Tag, Folder } from "lucide-react";
import { usePosts } from "@/hooks/content";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { formatDate } from "@workspace/shared/utils";
import { estimateReadTime } from "@/lib/utils";
import BlogCard from "@/components/blogs/BlogCard";
import BlogSidebar from "@/components/blogs/BlogSidebar";
import { PostViewTracker } from "@/components/blogs/PostViewTracker";
import { PageHeader } from "@/components/layout/page-header";

export function BlogPostPageClient({ post }: { post: PostResponse }) {
  const { data: relatedPosts, isLoading } = usePosts({
    status: "published",
    limit: 3,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <>
      <PageHeader title={post.title} subtitle={post.category.name} />

      <section className="section-wrapper section-container grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <article className="lg:col-span-2">
          <header className="mb-8">
            {post.category && (
              <div className="mb-4">
                <Badge variant="secondary" asChild>
                  <Link
                    href={`/blogs/category/${post.category.slug}`}
                    className="flex items-center gap-1"
                  >
                    <Folder className="h-3 w-3" />
                    {post.category.name}
                  </Link>
                </Badge>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={post.author.image.url}
                      alt={post.author.displayName}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                )}
                <span className="font-medium">{post.author.displayName}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.publishedAt!)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {estimateReadTime(post.content)} min read
              </div>
              <PostViewTracker slug={post.slug} prevCount={post.viewsCount} />
            </div>

            {post.cover && (
              <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.cover.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            <div className="flex items-center justify-between border-y py-4 mb-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {formatDate(post.updatedAt)}
              </div>
            </div>
          </header>

          <div className="mb-12">
            {post.excerpt && (
              <div className="text-xl italic text-muted-foreground border-l-4 border-primary pl-4 mb-8">
                {post.excerpt}
              </div>
            )}
            <RichContent html={post.content} />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline" asChild>
                    <Link href={`/blogs/tags/${tag.slug}`} className="gap-1">
                      #{tag.name}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {relatedPosts?.posts && relatedPosts.posts.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.posts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost.id}
                    post={relatedPost}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">Comments (0)</h3>
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">
                Comments are disabled for this post.
              </p>
            </div>
          </div>
        </article>

        <div className="lg:col-span-1">
          <BlogSidebar recentPosts={[post]} />
        </div>
      </section>
    </>
  );
}
