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

const PAGE_TITLE = "Nationwide Medical Billing";
const PAGE_DESCRIPTION =
  "MI MedCare LLC offers professional medical billing services in the USA for family practice, internal medicine, mental health & urgent care.";
const PAGE_URL = "https://www.mimedcare.com/";

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

export default function Home() {
  return (
    <>
      <HeroSection />
      <MetricsSection />
      <SuccessMetrics />
      <ServicesSection limit={6} useConstantColors />
      <FeaturesSection />
      <HowItWorksSection useConstantColors />
      <BenefitsSection useConstantColors />
      <EHRSection limit={8} />
      <SpecialtiesSection limit={8} useConstantColors />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
    </>
  );
}
