import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { BlogSection } from "@/components/sections/blog-section";
import { CTASection } from "@/components/sections/cta-section";

const PAGE_TITLE = "Blog & Insights";
const PAGE_DESCRIPTION =
  "Explore practical articles on medical billing, coding compliance, revenue cycle optimization, and healthcare operations.";
const PAGE_URL = "https://www.mimedcare.com/blogs";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "MI MedCare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function BlogsPage() {
  return (
    <>
      <PageHeader
        title="Blog & Insights"
        badge="Resource Center"
        description="Explore practical articles on medical billing, coding compliance, revenue cycle optimization, and healthcare operations."
      />
      <BlogSection />
      <CTASection />
    </>
  );
}
