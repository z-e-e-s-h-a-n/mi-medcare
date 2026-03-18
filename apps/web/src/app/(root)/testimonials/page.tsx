import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { BlogSection } from "@/components/sections/blog-section";
import { FAQSection } from "@/components/sections/faq-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { SuccessMetrics } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "See what healthcare providers say about working with MI MedCare and how our team improved their revenue cycle outcomes.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title="Client Testimonials"
        subtitle="Success Stories"
        description="See what healthcare providers say about working with MI MedCare and how our team improved their revenue cycle outcomes."
        imageUrl="https://images.pexels.com/photos/8313224/pexels-photo-8313224.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <MetricsSection />

      <TestimonialsSection />

      <SuccessMetrics className="bg-muted" />

      <BlogSection params={{ limit: 3 }} />

      <FAQSection faqs={FAQS.slice(0, 6)} className="bg-muted" />
    </>
  );
}
