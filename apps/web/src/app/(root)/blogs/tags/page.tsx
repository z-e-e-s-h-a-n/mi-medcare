import { type Metadata } from "next";
import { TagListClient } from "./_page";

export const metadata: Metadata = {
  title: "Blog Tags - Explore Topics",
  description:
    "Browse all blog posts by tags and topics. Find content that interests you.",
};

const page = () => {
  return <TagListClient />;
};

export default page;
