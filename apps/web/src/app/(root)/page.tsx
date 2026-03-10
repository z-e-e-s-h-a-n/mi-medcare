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
