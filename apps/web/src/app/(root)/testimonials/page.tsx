import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";

const PAGE_TITLE = "Client Testimonials";
const PAGE_DESCRIPTION =
  "See what healthcare providers say about working with MI MedCare and how our team improved their revenue cycle outcomes.";
const PAGE_URL = "https://www.mimedcare.com/testimonials";

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

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title="Client Testimonials"
        badge="Success Stories"
        description="See what healthcare providers say about working with MI MedCare and how our team improved their revenue cycle outcomes."
      />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
