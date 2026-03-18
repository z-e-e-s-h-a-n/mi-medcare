import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  Stethoscope,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { BlogSection } from "@/components/sections/blog-section";
import { FAQSection } from "@/components/sections/faq-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SuccessMetrics } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CASE_STUDIES, FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Healthcare Billing Case Studies",
  description:
    "Real examples of how we helped practices improve collections, reduce AR days, and strengthen billing performance.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        title="Healthcare Billing Case Studies"
        subtitle="Case Studies"
        description="Real examples of how we helped practices improve collections, reduce AR days, and strengthen billing performance."
        imageUrl="https://images.pexels.com/photos/7793162/pexels-photo-7793162.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <MetricsSection />

      <section className="section-wrapper">
        <div className="section-container">
          <SectionHeader
            subtitle="Results"
            title="Proof from real practices"
            description="Each case study highlights what changed, how long it took, and the measurable billing outcomes we delivered."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.slug}
                className="rounded-2xl border bg-background p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    <Stethoscope className="h-3.5 w-3.5" />
                    {study.specialty}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                    <BarChart3 className="h-3.5 w-3.5" />
                    {study.result}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                    <CalendarClock className="h-3.5 w-3.5" />
                    {study.timeline}
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-3">{study.title}</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  {study.summary}
                </p>

                <Link
                  href={study.slug}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Read Case Study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SuccessMetrics className="bg-muted" />

      <ServicesSection limit={6} className="bg-background" />

      <TestimonialsSection className="bg-muted" />

      <BlogSection params={{ limit: 3 }} />

      <FAQSection faqs={FAQS.slice(0, 6)} className="bg-muted" />
    </>
  );
}
