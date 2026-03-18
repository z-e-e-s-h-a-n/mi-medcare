import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { BlogSection } from "@/components/sections/blog-section";
import { FAQSection } from "@/components/sections/faq-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Explore practical articles on medical billing, coding compliance, revenue cycle optimization, and healthcare operations.",
};

export default async function BlogsPage() {
  return (
    <>
      <PageHeader
        title="Blog & Insights"
        badge="Resource Center"
        description="Explore practical articles on medical billing, coding compliance, revenue cycle optimization, and healthcare operations."
        imageUrl="https://images.pexels.com/photos/7643743/pexels-photo-7643743.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <MetricsSection />

      <BlogSection params={{ limit: 12 }} />

      <ServicesSection limit={6} className="bg-muted" />

      <TestimonialsSection className="bg-background" />

      <FAQSection faqs={FAQS.slice(0, 6)} className="bg-muted" />
    </>
  );
}
