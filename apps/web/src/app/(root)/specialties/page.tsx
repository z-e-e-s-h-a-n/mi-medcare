import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { CTASection } from "@/components/sections/cta-section";

const PAGE_TITLE = "Specialty-Focused Medical Billing";
const PAGE_DESCRIPTION =
  "From primary care to complex surgical specialties, we deliver coding and billing workflows tailored to each practice type.";
const PAGE_URL = "https://www.mimedcare.com/specialties";

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

export default function SpecialtiesPage() {
  return (
    <>
      <PageHeader
        title="Specialty-Focused Medical Billing"
        badge="40+ Specialties"
        description="From primary care to complex surgical specialties, we deliver coding and billing workflows tailored to each practice type."
      />
      <SpecialtiesSection useConstantColors />
      <CTASection />
    </>
  );
}
