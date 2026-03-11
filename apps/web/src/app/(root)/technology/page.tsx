import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { TECHNOLOGY_PILLARS } from "./data";

const PAGE_TITLE = "Technology & Automation";
const PAGE_DESCRIPTION =
  "MI MedCare brings AI automation, analytics, and deep integrations together so your practice avoids paperwork and gets paid faster.";
const PAGE_URL = "https://www.mimedcare.com/technology";

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

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        title="Technology"
        badge="Automation & Integration"
        description="MI MedCare brings AI automation, analytics, and deep integrations together so your practice avoids paperwork and gets paid faster."
      />

      <section className="section-container">
        <SectionHeader
          badge="Overview"
          title="Three pillars of our revenue operations stack"
          description="Each pillar is built to support the human teams that keep your revenue cycle healthy."
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
      </section>

      <section className="section-container pt-0">
        <SectionHeader
          badge="Workflow"
          title="How our technology stack works together"
          description="Automation, reporting, and integrations form a feedback loop that keeps your team proactive instead of reactive."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGY_PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className="rounded-2xl border border-border bg-background/60 p-6"
            >
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">{pillar.hero}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
