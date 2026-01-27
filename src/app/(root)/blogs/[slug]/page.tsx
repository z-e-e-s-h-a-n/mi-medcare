import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: AppPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const { data } = await findOnePost(slug);

  if (!data) {
    return { title: "Post Not Found" };
  }

  return {
    title: data.metaTitle || data.title,
    description: data.metaDescription || data.excerpt,
    openGraph: {
      title: data.title,
      description: data.excerpt || "",
      images: data.cover ? [data.cover.url] : [],
      publishedTime: data.publishedAt as unknown as string,
      authors: [data.author.displayName],
    },
  };
};

import BlogDetails from "@components/blog/BlogDetails";
import { findOnePost } from "@lib/post/client";

const page = async ({ params }: AppPageProps) => {
  const { slug } = await params;
  return <BlogDetails slug={slug} />;
};

export default page;
