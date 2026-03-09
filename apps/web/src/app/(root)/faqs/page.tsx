import { PageHeader } from "@/components/layout/page-header";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

export default function FAQsPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        badge="FAQs"
        description="Find quick answers about onboarding, pricing, compliance, reporting, and how we support your medical billing workflows."
      />
      <FAQSection />
      <CTASection />
    </>
  );
}
