import type { Metadata } from "next";
import BlogsPageClient from "./_page";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Explore practical articles on medical billing, coding compliance, revenue cycle optimization, and healthcare operations.",
};

export default function BlogsPage() {
  return <BlogsPageClient />;
}
