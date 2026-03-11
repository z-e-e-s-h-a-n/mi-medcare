import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Users, ShieldCheck, BarChart3 } from "lucide-react";
import { IconCpu } from "@tabler/icons-react";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { MetricsSection } from "@/components/sections/metrics-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import {
  business,
  BILLING_PROCESS,
  FAQS,
  HEADER_NAVIGATION,
  KPI_HIGHLIGHTS,
  SPECIALTIES,
  TRUST_BADGES,
} from "@/lib/constants";
import { gradientClass } from "@/lib/utils";

const PAGE_TITLE = "About Us";
const PAGE_DESCRIPTION =
  "We combine specialty billing expertise, automation, and compliance to help practices stop chasing payments and focus on patient care.";
const PAGE_URL = "https://www.mimedcare.com/about";

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

const aboutValues = [
  {
    title: "Provider-First Partnership",
    description:
      "Dedicated account teams pair with your clinical leads to trim paperwork and keep billing aligned with care delivery.",
    Icon: Users,
  },
  {
    title: "Compliance by Design",
    description:
      "Every coder, auditor, and analyst follows documented controls that keep patient data safe and adhere to HIPAA.",
    Icon: ShieldCheck,
  },
  {
    title: "Data-Driven Execution",
    description:
      "Realtime dashboards and KPI reviews guide decisions so you see faster reimbursements and shorter AR days.",
    Icon: BarChart3,
  },
];

const serviceHighlights = [
  {
    title: "Patient Eligibility & Benefits Verification",
    description:
      "We lock in insurance coverage, prior authorizations, and benefit limits before treatment to eliminate preventable denials.",
  },
  {
    title: "ICD-10 & CPT Medical Coding",
    description:
      "Certified coders review encounters with specialty-level knowledge, keeping modifiers and compliance checks precise.",
  },
  {
    title: "Claim Creation, Scrubbing & Electronic Submission",
    description:
      "Claims are built, scrubbed, and transmitted with payer rules baked into automation so fewer edits are needed.",
  },
  {
    title: "Denial Management & Appeals",
    description:
      "Our denials desk categorizes root causes, file appeals, and recovers revenue fast while we coach your staff on common pitfalls.",
  },
  {
    title: "Payment Posting & Payer Reconciliation",
    description:
      "Every insurance and patient payment is posted, reconciled, and matched to explanation-of-benefits line items for clean books.",
  },
  {
    title: "A/R Follow-Up & Collections Support",
    description:
      "Persistent follow-up across payers and patients shrinks outstanding balances and steadies your cash flow.",
  },
];

const differentiators = [
  "Specialty-specific leaders who understand cardiology, orthopedics, dermatology, psychiatry, and more.",
  "Transparent reporting with actionable insights that show payer mix shifts, clean claim rates, and AR age in real time.",
  "Scalable teams that flex for solo offices, multi-specialty groups, and health systems without slowing down care.",
  "Playbooks that update with every payer rule change so your practice stays compliant and audit-ready.",
];

const technologyDetails: Record<string, string> = {
  "AI Automation":
    "AI + RPA orchestrate coding checks, secondary claim scrubbing, and denial prediction so care teams stay focused on patients.",
  "Analytics & Reporting":
    "Live dashboards obsess over clean claim rates, AR days, payer mix, and provider performance so you can course-correct quickly.",
  "EHR Integrations":
    "Deep hooks with leading EHR and practice management systems keep data flowing without requiring a rip-and-replace.",
};

const technologyNavigation = HEADER_NAVIGATION.find(
  (item) => item.title === "Technology",
);

const technologyHighlights =
  technologyNavigation?.children.map((child) => ({
    title: child.title,
    description: child.description,
    detail: technologyDetails[child.title],
    href: child.href,
    Icon: child.icon ?? IconCpu,
  })) ?? [];

const faqSubset = FAQS.slice(0, 6);

export default function AboutPage() {
  const locationSummary = business.addresses
    ?.map((address) => `${address.city}, ${address.state}`)
    .join(" & ");

  return (
    <>
      <PageHeader
        title="About MI MedCare"
        badge="Who We Are"
        description="We combine specialty billing expertise, automation, and compliance to help practices stop chasing payments and focus on patient care."
      />

      <MetricsSection />

      <section className="section-container">
        <SectionHeader
          badge="Company Narrative"
          title="We manage your revenue cycle with intent"
          description="From patient intake through collections, we provide transparent partnership, measurable outcomes, and technology that integrates with your workflow."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-5 text-muted-foreground">
            <p>
              MI MedCare is a top-rated medical billing partner that specializes
              in solving revenue cycle challenges for practices across the
              United States. Our teams of 1,100+ certified billers and coders
              work behind the scenes to ensure claims are clean, compliant, and
              paid faster than industry averages. We adapt to your existing EMR,
              scheduling, and collections workflows so the transition is
              seamless and the revenue impact is immediate.
            </p>
            <p>
              Headquartered in {locationSummary}, our physicians,
              administrators, and practice managers benefit from
              specialty-specific support covering over {SPECIALTIES.length}{" "}
              medical fields. We focus on precision, responsive communication,
              and measurable improvements so you can reinvest time into patient
              care.
            </p>
          </div>

          <div className="grid gap-4">
            {aboutValues.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-border bg-background/50 p-6 transition hover:shadow-lg"
              >
                <div className="mb-4 h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <value.Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </article>
            ))}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-sm font-semibold text-primary mb-2">
                Need a custom rollout?
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                We scale implementation around your calendar, systems, and
                patient volumes.
              </p>
              <Link
                href="/contact"
                className="text-sm font-medium text-primary underline"
              >
                Schedule a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container bg-muted">
        <SectionHeader
          badge="Our Expertise"
          title="What MI MedCare does differently"
          description="We handle the full billing lifecycle so your practice is never left chasing a single claim."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {serviceHighlights.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-border bg-background/50 p-6 transition hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container">
        <SectionHeader
          badge="Technology"
          title="Automation and intelligence that backs every claim"
          description="Our people-first workflow is powered by AI, reporting, and integrations so you move from billing chaos to consistent cash flow."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {technologyHighlights.map((tech) => {
            const TechIcon = tech.Icon;
            return (
              <Link
                key={tech.title}
                href={tech.href}
                className="group flex flex-col rounded-2xl border border-border bg-background/50 p-6 transition hover:shadow-xl"
              >
                <div className="mb-4 h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <TechIcon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
                {tech.detail && (
                  <p className="mt-4 text-sm font-medium text-primary">
                    {tech.detail}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-container bg-muted">
        <SectionHeader
          badge="Impact"
          title="Measurable improvements in revenue performance"
          description="Across specialties, we deliver clean claims, faster reimbursements, and shorter AR cycles backed by transparent reporting."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KPI_HIGHLIGHTS.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-border bg-background/50 p-6"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container">
        <SectionHeader
          badge="Process"
          title="Billing that never skips a step"
          description="Our six-stage workflow mirrors the competitor’s best practices while staying true to MI MedCare’s compliance and automation culture."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BILLING_PROCESS.map((step) => {
            const StepIcon = step.icon;
            return (
              <article
                key={step.title}
                className="rounded-2xl border border-border bg-background/50 p-6"
              >
                <div
                  className={`mb-4 h-12 w-12 rounded-xl ${gradientClass(step.gradient)} text-white flex items-center justify-center`}
                >
                  <StepIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-container bg-muted">
        <SectionHeader
          badge="Trust"
          title="Certifications and compliance"
          description="We strictly follow HIPAA, SOC, and payer rules so every interaction is auditable, secure, and dependable."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_BADGES.map((badge) => {
            const BadgeIcon = badge.icon;
            return (
              <article
                key={badge.text}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-5"
              >
                <div
                  className={`rounded-xl p-3 text-white ${gradientClass(badge.gradient)}`}
                >
                  <BadgeIcon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {badge.text}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">
            Why practices choose MI MedCare
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FAQSection faqs={faqSubset} />
      <CTASection />
    </>
  );
}
