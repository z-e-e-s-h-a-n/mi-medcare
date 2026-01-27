import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: AppPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const { data } = await findOneCategory(slug);

  if (!data) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${data.name} - Blog Category`,
    description:
      data.description || `Browse all posts in ${data.name} category`,
  };
};

import CategoryDetails from "@components/blog/CategoryDetails";
import { findOneCategory } from "@lib/category/client";

const page = async ({ params }: AppPageProps) => {
  const { slug } = await params;
  return <CategoryDetails slug={slug} />;
};

export default page;
