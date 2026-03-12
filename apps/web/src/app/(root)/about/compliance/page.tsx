import type { Metadata } from "next";
import { CheckCircle2, FileCheck2, LockKeyhole, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Compliance & Data Security",
  description:
    "Our compliance-first billing model helps healthcare organizations reduce risk while maintaining strong reimbursement performance.",
};

const controls = [
  {
    title: "HIPAA-Aligned Operations",
    description:
      "We implement process controls and workforce practices aligned with HIPAA privacy and security requirements.",
    icon: ShieldCheck,
  },
  {
    title: "Data Access Governance",
    description:
      "Role-based access and operational safeguards help ensure only authorized personnel access sensitive data.",
    icon: LockKeyhole,
  },
  {
    title: "Documentation Standards",
    description:
      "We maintain billing and coding documentation discipline to support payer audits and reduce compliance risk.",
    icon: FileCheck2,
  },
];

const complianceFAQs = [
  {
    question: "How do you support HIPAA compliance in daily billing operations?",
    answer:
      "Our team follows strict access controls, secure workflow procedures, and continuous process checks to reduce privacy and security risks in day-to-day billing activities.",
  },
  {
    question: "Do you help practices prepare for payer and coding audits?",
    answer:
      "Yes. We keep documentation trails, coding logic, and claims-level records organized so providers can respond faster and more accurately during audits.",
  },
  {
    question: "Can you align compliance workflows with our existing EHR?",
    answer:
      "Yes. We adapt compliance checkpoints to your current EMR/EHR and payer mix without forcing major operational disruption.",
  },
];

const commitments = [
  "Strict handling procedures for protected health information",
  "Continuous coding and claims quality assurance",
  "Transparent reporting for denial and audit trends",
  "Ongoing process updates for evolving payer requirements",
];

export default function CompliancePage() {
  return (
    <>
      <PageHeader
        title="Compliance & Data Security"
        badge="Trust & Compliance"
        description="Our compliance-first billing model helps healthcare organizations reduce risk while maintaining strong reimbursement performance."
      />

      <section className="section-wrapper">
        <div className="section-container">
          <div className="grid gap-6 md:grid-cols-3">
            {controls.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-wrapper pt-0">
        <div className="section-container">
          <div className="rounded-2xl border bg-muted/30 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">
              Our Compliance Commitments
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {commitments.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={complianceFAQs} />
      <CTASection />
    </>
  );
}
