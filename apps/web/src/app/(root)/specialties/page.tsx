import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { BlogSection } from "@/components/sections/blog-section";
import { EHRSection } from "@/components/sections/ehr-section";
import { FAQSection } from "@/components/sections/faq-section";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { MetricsSection } from "@/components/sections/metrics-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Specialty-Focused Medical Billing",
  description:
    "From primary care to complex surgical specialties, we deliver coding and billing workflows tailored to each practice type.",
};

export default function SpecialtiesPage() {
  return (
    <>
      <PageHeader
        title="Specialty-Focused Medical Billing"
        subtitle="40+ Specialties"
        description="From primary care to complex surgical specialties, we deliver coding and billing workflows tailored to each practice type."
        imageUrl="https://images.pexels.com/photos/5407210/pexels-photo-5407210.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <MetricsSection />

      <SpecialtiesSection
        useConstantColors
      />

      <HowItWorksSection useConstantColors className="bg-muted" />

      <ServicesSection limit={6} className="bg-background" useConstantColors />

      <EHRSection limit={10} className="bg-muted" />

      <TestimonialsSection className="bg-background" />

      <BlogSection params={{ limit: 3 }} className="bg-muted" />

      <FAQSection faqs={FAQS.slice(0, 6)} className="bg-background" />
    </>
  );
}


