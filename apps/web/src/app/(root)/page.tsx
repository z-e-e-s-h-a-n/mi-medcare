import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { SuccessMetrics } from "@/components/sections/stats-section";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { BlogSection } from "@/components/sections/blog-section";
import { CTASection } from "@/components/sections/cta-section";
import { EHRSection } from "@/components/sections/ehr-section";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { MetricsSection } from "@/components/sections/metrics-section";

export const metadata: Metadata = {
  title: "Medical Billing Services in USA",
  description:
    "MI MedCare LLC offers professional medical billing services in the USA for family practice, internal medicine, mental health & urgent care.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <MetricsSection />
      <SuccessMetrics useConstantColors={false} />
      <ServicesSection limit={6} />
      <FeaturesSection useConstantColors={false} />
      <HowItWorksSection />
      <BenefitsSection />
      <EHRSection limit={8} />
      <SpecialtiesSection limit={8} />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
    </>
  );
}
