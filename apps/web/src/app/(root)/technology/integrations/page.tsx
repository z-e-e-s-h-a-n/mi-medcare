import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { EHR_SYSTEMS } from "@/lib/constants";
import { TECHNOLOGY_PILLARS } from "../data";

export const metadata: Metadata = {
  title: "EHR Integrations",
  description:
    "Secure connections keep your clinical system, scheduling platform, and billing stack in sync.",
};

const integrationChecklist = [
  "Map demographics, encounters, and insurance data from your EMR to our billing platform.",
  "Securely sync eligibility and benefits so claims never ship without coverage validation.",
  "Replay historic transactions to ensure payer IDs, modifiers, and CPT bundles align.",
];

export default function IntegrationsPage() {
  const pillar = TECHNOLOGY_PILLARS.find((item) => item.id === "integrations");
  if (!pillar) return null;

  return (
    <>
      <PageHeader
        title="EHR Integrations"
        badge="Technology"
        description="Secure connections keep your clinical system, scheduling platform, and billing stack in sync."
        imageUrl="https://images.pexels.com/photos/36252713/pexels-photo-36252713.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="section-wrapper">
        <div className="section-container">
          <SectionHeader
            title="Connect to any system"
            description={pillar.description}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background/60 p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Integration reach
              </h3>
              <p className="text-sm text-muted-foreground">
                MI MedCare connects with {EHR_SYSTEMS.length}+ EMRs and practice
                management platforms, including Epic, Cerner, Athenahealth,
                Allscripts, and niche specialty tools.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {pillar.hero}
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background/50 p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Implementation heartbeat
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {integrationChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section-wrapper pt-0">
        <div className="section-container">
          <SectionHeader
            title="What we sync"
            description="Bi-directional feeds keep payers, patient accounts, and charges aligned without re-keying."
        imageUrl="https://images.pexels.com/photos/36252713/pexels-photo-36252713.jpeg?auto=compress&cs=tinysrgb&w=1920"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {pillar.highlights.map((highlight) => (
              <article
                key={highlight}
                className="rounded-2xl border border-border bg-background/50 p-6"
              >
                <p className="text-sm text-muted-foreground">{highlight}</p>
              </article>
            ))}
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

      <CTASection />
    </>
  );
}

