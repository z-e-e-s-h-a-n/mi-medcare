import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { EHRSection } from "@/components/sections/ehr-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQS } from "@/lib/constants";
import { TECHNOLOGY_PILLARS } from "./data";

export const metadata: Metadata = {
  title: "Technology & Automation",
  description:
    "MI MedCare brings AI automation, analytics, and deep integrations together so your practice avoids paperwork and gets paid faster.",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        title="Technology"
        subtitle="Automation & Integration"
        description="MI MedCare brings AI automation, analytics, and deep integrations together so your practice avoids paperwork and gets paid faster."
        imageUrl="https://images.pexels.com/photos/8353837/pexels-photo-8353837.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <MetricsSection />

      <section className="section-wrapper">
        <div className="section-container">
          <SectionHeader
            subtitle="Overview"
            title="Three pillars of our revenue operations stack"
            description="Each pillar is designed to keep your team proactive: prevent denials, speed up collections, and reduce manual work."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {TECHNOLOGY_PILLARS.map((pillar) => (
              <Link
                key={pillar.id}
                href={`/technology/${pillar.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-background/50 p-6 transition hover:shadow-xl"
              >
                <div className="mb-4 h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <pillar.icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {pillar.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {pillar.description}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {pillar.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-4 text-sm font-medium text-primary underline">
                  Learn more
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection useConstantColors className="bg-muted" />

      <EHRSection limit={10} className="bg-background" />

      <TestimonialsSection className="bg-muted" />

      <FAQSection faqs={FAQS.slice(0, 6)} className="bg-background" />
    </>
  );
}
