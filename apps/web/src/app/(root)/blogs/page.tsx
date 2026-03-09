import { PageHeader } from "@/components/layout/page-header";
import { BlogSection } from "@/components/sections/blog-section";
import { CTASection } from "@/components/sections/cta-section";

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
