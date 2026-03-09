import { PageHeader } from "@/components/layout/page-header";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { CTASection } from "@/components/sections/cta-section";

export default function SpecialtiesPage() {
  return (
    <>
      <PageHeader
        title="Specialty-Focused Medical Billing"
        badge="40+ Specialties"
        description="From primary care to complex surgical specialties, we deliver coding and billing workflows tailored to each practice type."
      />
      <SpecialtiesSection />
      <CTASection />
    </>
  );
}
