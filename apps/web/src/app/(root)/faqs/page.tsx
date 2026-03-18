import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { BlogSection } from "@/components/sections/blog-section";
import { FAQSection } from "@/components/sections/faq-section";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { MetricsSection } from "@/components/sections/metrics-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find quick answers about onboarding, pricing, compliance, reporting, and how we support your medical billing workflows.",
};

export default async function FAQsPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        badge="FAQs"
        description="Find quick answers about onboarding, pricing, compliance, reporting, and how we support your medical billing workflows."
        imageUrl="https://images.pexels.com/photos/7709161/pexels-photo-7709161.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <MetricsSection />

      <FAQSection faqs={FAQS} className="bg-background" />

      <HowItWorksSection useConstantColors className="bg-muted" />

      <ServicesSection limit={6} className="bg-background" />

      <TestimonialsSection className="bg-muted" />

      <BlogSection params={{ limit: 3 }} />
    </>
  );
}
