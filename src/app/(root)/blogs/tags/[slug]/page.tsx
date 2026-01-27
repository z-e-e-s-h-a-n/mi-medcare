import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: AppPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const { data } = await findOneTag(slug);

  if (!data) {
    return {
      title: "Tag Not Found",
    };
  }

  return {
    title: `${data.name} Tag - Blog Posts`,
    description: `Browse all blog posts tagged with ${data.name}. Find related content and articles.`,
  };
};

import TagDetails from "@components/blog/TagDetails";
import { findOneTag } from "@lib/tags/client";

const page = async ({ params }: AppPageProps) => {
  const { slug } = await params;
  return <TagDetails slug={slug} />;
};

export default page;
