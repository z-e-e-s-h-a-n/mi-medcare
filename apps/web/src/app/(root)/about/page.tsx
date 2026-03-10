import { CheckCircle2, Users, ShieldCheck, BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { MetricsSection } from "@/components/sections/metrics-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";

const values = [
  {
    title: "Provider-First Partnership",
    description:
      "We align our billing workflows with your clinical operations so your team can focus on patient care.",
    icon: Users,
  },
  {
    title: "Compliance by Design",
    description:
      "From coding standards to documentation checks, we build compliance into every step of the revenue cycle.",
    icon: ShieldCheck,
  },
  {
    title: "Data-Driven Execution",
    description:
      "We use reporting and KPI tracking to improve collections, reduce denials, and shorten AR timelines.",
    icon: BarChart3,
  },
];

const differentiators = [
  "Dedicated account managers and specialty billing experts",
  "Transparent reporting with actionable financial insights",
  "Scalable support for solo practices and enterprise groups",
  "Consistent process optimization across payer mix changes",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About MI MedCare"
        badge="Who We Are"
        description="We help healthcare organizations improve financial performance with reliable, compliant, and specialty-focused billing operations."
      />

      <MetricsSection />

      <section className="section-container">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((item) => {
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
      </section>

      <section className="section-container pt-0">
        <div className="rounded-2xl border bg-muted/30 p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Why Practices Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {differentiators.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </>
  );
}
