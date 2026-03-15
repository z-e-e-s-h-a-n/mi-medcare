import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { BlogSection } from "@/components/sections/blog-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Explore practical articles on medical billing, coding compliance, revenue cycle optimization, and healthcare operations.",
};

export default function BlogsPage() {
  return (
    <>
      <PageHeader
        title="Blog & Insights"
        badge="Resource Center"
        description="Explore practical articles on medical billing, coding compliance, revenue cycle optimization, and healthcare operations."
        imageUrl="https://images.pexels.com/photos/7643743/pexels-photo-7643743.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />
      <BlogSection />
      <CTASection />
    </>
  );
}

