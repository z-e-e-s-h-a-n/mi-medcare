import { PageHeader } from "@/components/layout/page-header";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";

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
