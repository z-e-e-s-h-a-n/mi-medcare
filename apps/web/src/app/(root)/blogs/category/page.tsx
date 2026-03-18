import { type Metadata } from "next";
import { CategoryListClient } from "./_page";

export const metadata: Metadata = {
  title: "Blog Categories",
  description: "Explore our blog posts organized by categories and topics.",
};

const page = () => {
  return <CategoryListClient />;
};

export default page;
