import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "See what healthcare providers say about working with MI MedCare and how our team improved their revenue cycle outcomes.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title="Client Testimonials"
        badge="Success Stories"
        description="See what healthcare providers say about working with MI MedCare and how our team improved their revenue cycle outcomes."
        imageUrl="https://images.pexels.com/photos/8313224/pexels-photo-8313224.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

