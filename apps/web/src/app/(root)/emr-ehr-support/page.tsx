import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Workflow, Zap } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EHRSection } from "@/components/sections/ehr-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "EMR & EHR Billing Support",
  description:
    "We support a wide range of EMR and EHR systems so your billing operations stay efficient without changing the platform you already use.",
};

const supportHighlights = [
  {
    title: "Seamless Platform Alignment",
    description:
      "Our team works directly inside your current EMR/EHR to keep claim workflows smooth and consistent.",
    icon: Workflow,
  },
  {
    title: "Compliance and Security",
    description:
      "HIPAA-focused workflows and strict process controls protect patient and billing data end to end.",
    icon: ShieldCheck,
  },
  {
    title: "Faster Claim Turnaround",
    description:
      "Platform-specific billing expertise helps reduce rework and supports quicker clean-claim submission.",
    icon: Zap,
  },
];

const supportIncludes = [
  "Claim creation and submission support inside your existing EHR",
  "EHR workflow optimization for front desk and billing staff",
  "Insurance verification and eligibility process alignment",
  "Denial trend analysis tied to platform-specific gaps",
];

export default function EmrEhrSupportPage() {
  return (
    <>
      <PageHeader
        title="EMR & EHR Billing Support"
        badge="Technology Support"
        description="We support a wide range of EMR and EHR systems so your billing operations stay efficient without changing the platform you already use."
      />

      <EHRSection />

      <section className="section-container pt-0">
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {supportHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border bg-muted/30 p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">
            What Our EMR/EHR Support Covers
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {supportIncludes.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm md:text-base text-muted-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
