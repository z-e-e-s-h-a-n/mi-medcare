import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ServicesSection } from "@/components/sections/services-section";
import { CTASection } from "@/components/sections/cta-section";

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
        badge="Our Services"
        description="Explore our end-to-end revenue cycle management services designed to improve collections, reduce denials, and speed up reimbursements."
      />
      <ServicesSection />
      <CTASection />
    </>
  );
}
