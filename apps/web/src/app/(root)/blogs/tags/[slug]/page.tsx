import { type Metadata } from "next";
import type { AppPageProps } from "@workspace/contracts";
import { TagDetailsClient } from "./_page";
import { cache } from "react";
import type { TagResponse } from "@workspace/contracts/content";
import { getTagBySlug } from "@workspace/sdk/content";
import { notFound } from "next/navigation";

const getCachedTagBySlug = cache(
  async (slug: string): Promise<TagResponse | null> => {
    try {
      const res = await getTagBySlug(slug);
      return res.data;
    } catch {
      return null;
    }
  },
);

export const generateMetadata = async ({
  params,
}: AppPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = await getCachedTagBySlug(slug);

  if (!tag) {
    return {
      title: "Tag Not Found",
      description: "The requested Tag could not be found.",
    };
  }

  return {
    title: `${tag.name} Tag - Blog Posts`,
    description: `Browse all blog posts tagged with ${tag.name}. Find related content and articles.`,
  };
};

const page = async ({ params }: AppPageProps) => {
  const { slug } = await params;
  const tag = await getCachedTagBySlug(slug);
  if (!tag) notFound();

  return <TagDetailsClient tag={tag} />;
};

export default page;
