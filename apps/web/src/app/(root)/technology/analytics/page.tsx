import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { FAQSection } from "@/components/sections/faq-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQS, KPI_HIGHLIGHTS } from "@/lib/constants";
import { TECHNOLOGY_PILLARS } from "../data";

export const metadata: Metadata = {
  title: "Analytics & Reporting",
  description:
    "Realtime insights replace guesswork, showing everything from clean claim rate to net collections so you can make faster decisions.",
};

const analyticsMetrics = KPI_HIGHLIGHTS.filter((metric) =>
  ["Average AR Days", "Clean Claim Rate", "Revenue Increase"].includes(metric.label),
);

const analyticsPlaybook = [
  "Role-based dashboards keep clinicians, administrators, and finance leaders aligned.",
  "Denial analysis highlights payer pain points so we can coach your staff and adjust automation.",
  "Drill-down reporting connects claims, visits, AR, and denial trends in one view.",
];

export default function AnalyticsPage() {
  const pillar = TECHNOLOGY_PILLARS.find((item) => item.id === "analytics");
  if (!pillar) return null;

  return (
    <>
      <PageHeader
        title="Analytics & Reporting"
        badge="Technology"
        description="Realtime insights replace guesswork, showing everything from clean claim rate to net collections so you can make faster decisions."
        imageUrl="https://images.pexels.com/photos/8353837/pexels-photo-8353837.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <MetricsSection />

      <section className="section-wrapper">
        <div className="section-container">
          <SectionHeader
            badge="Analytics"
            title="Data that drives smarter decisions"
            description={pillar.description}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {analyticsMetrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-2xl border border-border bg-background/50 p-6"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {metric.label}
                </p>
                <p className="text-3xl font-bold text-foreground mt-3">
                  {metric.value}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-background/60 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Reports that matter most
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {analyticsPlaybook.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Our dashboards export to CSV, PDF, and visualization tools so you
              can share trends with boards or payers instantly.
            </p>
          </div>
        </div>
      </section>

      <section className="section-wrapper pt-0">
        <div className="section-container">
          <SectionHeader
            badge="Visibility"
            title="How it all connects"
            description={pillar.hero}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {pillar.highlights.map((highlight) => (
              <article
                key={highlight}
                className="rounded-2xl border border-border bg-background/40 p-6"
              >
                <p className="text-sm text-muted-foreground">{highlight}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <Link href="/technology" className="font-medium text-primary underline">
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
