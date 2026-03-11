import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ServicesSection } from "@/components/sections/services-section";
import { CTASection } from "@/components/sections/cta-section";

const PAGE_TITLE = "Medical Billing Services";
const PAGE_DESCRIPTION =
  "Explore our end-to-end revenue cycle management services designed to improve collections, reduce denials, and speed up reimbursements.";
const PAGE_URL = "https://www.mimedcare.com/services";

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

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Medical Billing Services"
        badge="Our Services"
        description="Explore our end-to-end revenue cycle management services designed to improve collections, reduce denials, and speed up reimbursements."
      />
      <ServicesSection />
      <CTASection />
    </>
  );
}
