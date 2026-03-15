import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find quick answers about onboarding, pricing, compliance, reporting, and how we support your medical billing workflows.",
};

export default function FAQsPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        badge="FAQs"
        description="Find quick answers about onboarding, pricing, compliance, reporting, and how we support your medical billing workflows."
        imageUrl="https://images.pexels.com/photos/7709161/pexels-photo-7709161.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />
      <FAQSection />
      <CTASection />
    </>
  );
}

