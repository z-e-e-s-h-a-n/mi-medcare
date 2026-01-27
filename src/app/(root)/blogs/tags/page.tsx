import TagList from "@components/blog/TagList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Tags - Explore Topics",
  description:
    "Browse all blog posts by tags and topics. Find content that interests you.",
};

const page = () => {
  return <TagList />;
};

export default page;
