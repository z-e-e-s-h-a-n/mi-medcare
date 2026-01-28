"use client";
import React from "react";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Eye,
  ArrowLeft,
  Share2,
  Bookmark,
  Tag,
  Folder,
} from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { usePost } from "@hooks/post";
import { usePosts } from "@hooks/post";
import { formatNullDate, getReadTime } from "@utils/general";
import PostCard from "@components/blog/BlogCard";
import BlogSidebar from "@components/blog/BlogSidebar";
import PostSkeleton from "@components/skeleton/PostSkeleton";

const BlogDetails = ({ slug }: BaseBlogPageProps) => {
  const { data: post, isLoading } = usePost(slug);
  const { data: relatedPosts } = usePosts({
    status: "published",
    limit: 3,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Back Navigation */}
      <section className="border-b">
        <div className="px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blogs" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Article Content */}
        <article className="lg:col-span-2">
          {/* Article Header */}
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

            {/* Meta Information */}
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
                {formatNullDate(post.publishedAt)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {getReadTime(post.content)} min read
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.views?.toLocaleString()} views
              </div>
            </div>

            {/* Cover Image */}
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

            {/* Action Buttons */}
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
                Last updated: {formatNullDate(post.updatedAt)}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {post.excerpt && (
              <div className="text-xl italic text-muted-foreground border-l-4 border-primary pl-4 mb-8">
                {post.excerpt}
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
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

          {/* Author Bio */}
          <div className="bg-muted/30 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              {post.author.image && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={post.author.image.url}
                    alt={post.author.displayName}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              )}
              <div>
                <h4 className="text-lg font-bold mb-2">About the Author</h4>
                <p className="text-muted-foreground">
                  {post.author.displayName} is an expert in web development and
                  design. With years of experience, they share insights and
                  tutorials to help others grow their skills.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts?.posts && relatedPosts.posts.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.posts.map((relatedPost) => (
                  <PostCard
                    key={relatedPost.id}
                    post={relatedPost}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">Comments (0)</h3>
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">
                Comments are disabled for this post.
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BlogSidebar recentPosts={[post]} />
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
