import { type Metadata } from "next";
import type { AppPageProps } from "@workspace/contracts";
import { cache } from "react";
import type { CategoryResponse } from "@workspace/contracts/content";
import { getCategoryBySlug } from "@workspace/sdk/content";
import { CategoryDetailsClient } from "./_page";
import { notFound } from "next/navigation";

const getCachedCategoryBySlug = cache(
  async (slug: string): Promise<CategoryResponse | null> => {
    const res = await getCategoryBySlug(slug);
    return res.data ?? null;
  },
);

export const generateMetadata = async ({
  params,
}: AppPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const category = await getCachedCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested Category could not be found.",
    };
  }

  return {
    title: `${category.name} - Blog Category`,
    description:
      category.description || `Browse all posts in ${category.name} category`,
  };
};

const page = async ({ params }: AppPageProps) => {
  const { slug } = await params;
  const category = await getCachedCategoryBySlug(slug);

  if (!category) notFound();

  return <CategoryDetailsClient category={category} />;
};

export default page;
