import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { FAQSection } from "@/components/sections/faq-section";
import { KpiSection } from "@/components/sections/kpi-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQS } from "@/lib/constants";
import { TECHNOLOGY_PILLARS } from "../data";

export const metadata: Metadata = {
  title: "AI Automation",
  description:
    "AI and RPA power our intelligent revenue cycle so enrollees are checked, claims are scrubbed, and denials are resolved automatically.",
};

const aiUseCases = [
  "Robotic claim scrubbing validates patient, payer, and charge data before transmission.",
  "Denial prediction surfaces high-risk claims and routes them to appeals automation or senior coders.",
  "RPA handles payer portal uploads, ERA downloads, and follow-up so your team stays focused on patients.",
];

export default function AiAutomationPage() {
  const pillar = TECHNOLOGY_PILLARS.find((item) => item.id === "ai-automation");
  if (!pillar) return null;

  return (
    <>
      <PageHeader
        title="AI Automation"
        subtitle="Technology"
        description="AI and RPA power our intelligent revenue cycle so enrollees are checked, claims are scrubbed, and denials are resolved automatically."
        imageUrl="https://images.pexels.com/photos/30547581/pexels-photo-30547581.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <MetricsSection />

      <section className="section-wrapper">
        <div className="section-container">
          <SectionHeader
            subtitle="Automation"
            title="Automating accuracy and speed"
            description={pillar.description}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background/60 p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                How it works
              </h3>
              <p className="text-sm text-muted-foreground">{pillar.hero}</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {pillar.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-background/50 p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Automation in action
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {aiUseCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-primary" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                These automations layer on top of our specialty knowledge so
                risk-averse specialties get the same level of care as
                high-volume urgent care centers.
              </p>
            </article>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Outcomes you can track
            </p>
            <p className="mt-2 text-lg font-semibold">
              KPIs that improve when automation does the heavy lifting.
            </p>
            <div className="mt-6">
              <KpiSection useConstantColors />
            </div>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            <Link
              href="/technology"
              className="font-medium text-primary underline"
            >
              Back to the technology overview
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection className="bg-muted" />

      <FAQSection faqs={FAQS.slice(0, 6)} className="bg-background" />
    </>
  );
}
