import CategoryList from "@components/blog/CategoryList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Categories",
  description: "Explore our blog posts organized by categories and topics.",
};

const page = () => {
  return <CategoryList />;
};

export default page;
