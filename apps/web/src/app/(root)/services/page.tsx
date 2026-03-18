import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { BlogSection } from "@/components/sections/blog-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { MetricsSection } from "@/components/sections/metrics-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Medical Billing Services",
  description:
    "Explore our end-to-end revenue cycle management services designed to improve collections, reduce denials, and speed up reimbursements.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Medical Billing Services"
        subtitle="Our Services"
        description="Explore our end-to-end revenue cycle management services designed to improve collections, reduce denials, and speed up reimbursements."
        imageUrl="https://images.pexels.com/photos/4989167/pexels-photo-4989167.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <MetricsSection />

      <ServicesSection useConstantColors />

      <FeaturesSection useConstantColors className="bg-muted" />

      <HowItWorksSection useConstantColors className="bg-background" />

      <SpecialtiesSection
        limit={8}
        useConstantColors
        className="bg-muted"
        bgUrl="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?cs=srgb&dl=pexels-pixabay-263402.jpg&fm=jpg&w=1920"
      />

      <TestimonialsSection className="bg-background" />

      <BlogSection params={{ limit: 3 }} className="bg-muted" />

      <FAQSection faqs={FAQS.slice(0, 6)} className="bg-background" />
    </>
  );
}
