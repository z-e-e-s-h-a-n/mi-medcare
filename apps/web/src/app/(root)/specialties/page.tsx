import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Specialty-Focused Medical Billing",
  description:
    "From primary care to complex surgical specialties, we deliver coding and billing workflows tailored to each practice type.",
};

export default function SpecialtiesPage() {
  return (
    <>
      <PageHeader
        title="Specialty-Focused Medical Billing"
        badge="40+ Specialties"
        description="From primary care to complex surgical specialties, we deliver coding and billing workflows tailored to each practice type."
        imageUrl="https://images.pexels.com/photos/5407210/pexels-photo-5407210.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />
      <SpecialtiesSection useConstantColors />
      <CTASection />
    </>
  );
}

