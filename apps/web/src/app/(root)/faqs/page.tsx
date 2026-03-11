import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

const PAGE_TITLE = "Frequently Asked Questions";
const PAGE_DESCRIPTION =
  "Find quick answers about onboarding, pricing, compliance, reporting, and how we support your medical billing workflows.";
const PAGE_URL = "https://www.mimedcare.com/faqs";

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
