import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import type { PostResponse } from "@workspace/contracts/content";
import { getPostBySlug } from "@workspace/sdk/content";
import type { AppPageProps } from "@workspace/contracts";
import { BlogPostPageClient } from "./_page";

const getCachedPostBySlug = cache(
  async (slug: string): Promise<PostResponse | null> => {
    try {
      const cookieStore = await cookies();
      const visitorKey = cookieStore.get("visitorKey")?.value;
      const res = await getPostBySlug(slug, {
        headers: {
          Cookie: `visitorKey=${visitorKey}`,
        },
      });
      return res.data;
    } catch {
      return null;
    }
  },
);

export async function generateMetadata({
  params,
}: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
  };
}

export default async function BlogPostPage({ params }: AppPageProps) {
  const { slug } = await params;
  const post = await getCachedPostBySlug(slug);

  if (!post) notFound();

  return <BlogPostPageClient post={post} />;
}
