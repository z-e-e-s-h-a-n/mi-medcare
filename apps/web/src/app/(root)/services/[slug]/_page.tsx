/* eslint-disable react-hooks/static-components */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Mail,
  Microscope,
  Phone,
  type LucideIcon,
} from "lucide-react";
import {
  IconAlertTriangle,
  IconChartBar,
  IconClipboardCheck,
  IconFileText,
  IconRosetteDiscountCheck,
  IconShield,
  IconShieldCheck,
  IconWallet,
} from "@tabler/icons-react";

import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { FAQSection } from "@/components/sections/faq-section";
import { business } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

export type ServiceDetailsContent = {
  overview: string;
  uniqueAgents?: {
    name: string;
    description: string;
  }[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  process: {
    step: string;
    description: string;
  }[];
  benefits: string[];
  stats: {
    label: string;
    value: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export type ServiceData = {
  title: string;
  href: string;
  description: string;
  image: string;
  icon: string;
  stats: string;
  gradient: string;
  details: ServiceDetailsContent;
};

const ICONS: Record<string, LucideIcon> = {
  IconFileText,
  IconChartBar,
  IconShieldCheck,
  IconRosetteDiscountCheck,
  IconClipboardCheck,
  IconAlertTriangle,
  IconWallet,
  IconShield,
  BarChart3,
  Microscope,
};

const getIcon = (name: string | undefined) =>
  (name && ICONS[name]) || IconFileText;

interface ServiceDetailsProps {
  slug: string;
  detail: ServiceData;
  related: ServiceData[];
}

export function ServiceDetails({ detail, related }: ServiceDetailsProps) {
  const AccentIcon = getIcon(detail.icon);
  const accentGradient = detail.gradient || "from-primary to-secondary";

  return (
    <>
      <PageHeader
        title={detail.title}
        badge={detail.stats}
        description={detail.description}
        imageUrl={detail.image}
      />

      <section className="section-wrapper -mt-10 pb-10">
        <div className="section-container">
          <div className="grid gap-4 md:grid-cols-3">
            <div
              className={cn(
                "rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-sm overflow-hidden relative",
                gradientClass(accentGradient, { opacity: 8, direction: "br" }),
              )}
            >
              <div className="absolute -right-10 -top-10 opacity-[0.08]">
                <AccentIcon className="size-36" />
              </div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Service highlight
              </p>
              <p className="mt-2 text-2xl font-bold">{detail.stats}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Built for accuracy, speed, and clean reimbursement.
              </p>
            </div>

            {(detail.details.stats ?? []).slice(0, 2).map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-sm"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-foreground">
                  {s.value}
                </p>
                <div className="mt-4 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full w-2/3",
                      gradientClass(accentGradient),
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrapper relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
            <div className="space-y-14">
              <div id="overview" className="scroll-mt-24">
                <SectionHeader
                  badge="Overview"
                  title="What you get"
                  description={detail.details.overview}
                  center={false}
                />
              </div>

              <div id="features" className="scroll-mt-24">
                <SectionHeader
                  badge="Key Features"
                  title="Built to prevent denials and speed up payments"
                  description="Every feature is designed to reduce rework, improve compliance, and give you clear financial visibility."
                  center={false}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  {detail.details.keyFeatures.map((f, idx) => (
                    <motion.article
                      key={f.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      className={cn(
                        "group rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-sm transition-all duration-300",
                        "hover:-translate-y-1 hover:shadow-xl hover:border-primary/25",
                      )}
                    >
                      <div
                        className={cn(
                          "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm",
                          gradientClass(accentGradient, { direction: "br" }),
                        )}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold">{f.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {f.description}
                      </p>
                      <div
                        className={cn(
                          "mt-5 h-0.5 w-full opacity-40",
                          gradientClass(accentGradient),
                        )}
                      />
                    </motion.article>
                  ))}
                </div>
              </div>

              {!!detail.details.uniqueAgents?.length && (
                <div id="agents" className="scroll-mt-24">
                  <SectionHeader
                    badge="Automation"
                    title="AI agents included"
                    description="Purpose-built agents support daily billing work — scrubbing, denial intelligence, reconciliation, and follow-up."
                    center={false}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    {detail.details.uniqueAgents.map((agent, idx) => (
                      <motion.article
                        key={agent.name}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                        className={cn(
                          "rounded-2xl border border-border/60 bg-muted/40 p-6 shadow-sm",
                          "hover:shadow-lg transition-shadow",
                        )}
                      >
                        <p className="text-xs font-semibold text-primary">
                          {agent.name}
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {agent.description}
                        </p>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}

              <div id="process" className="scroll-mt-24">
                <SectionHeader
                  badge="Process"
                  title="How implementation works"
                  description="A structured workflow that keeps your billing clean while minimizing disruption for your team."
                  center={false}
                />

                <div className="grid gap-4">
                  {detail.details.process.map((step, index) => (
                    <div
                      key={step.step}
                      className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "shrink-0 h-10 w-10 rounded-xl text-white flex items-center justify-center font-bold",
                            gradientClass(accentGradient, { direction: "br" }),
                          )}
                        >
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold">{step.step}</h3>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="benefits" className="scroll-mt-24">
                <SectionHeader
                  badge="Benefits"
                  title="What improves after onboarding"
                  description="Clear operational wins that show up in performance, cash flow, and team workload."
                  center={false}
                />

                <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 md:p-8">
                  <div className="grid gap-3 md:grid-cols-2">
                    {detail.details.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg text-white",
                            gradientClass(accentGradient, { direction: "br" }),
                          )}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {b}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Quick actions
                </p>
                <div className="mt-4 grid gap-3">
                  <Button href="/contact" size="lg" className="group">
                    Get a proposal
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="justify-start gap-2"
                  >
                    <a href={`tel:${business.contact.phones?.[0]?.tel ?? business.contact.phones[0].tel}`}>
                      <Phone className="h-4 w-4" />
                      Call: {business.contact.phones?.[0]?.display ?? business.contact.phones[0].display}
                    </a>
                  </Button>
                    <p className="text-xs text-muted-foreground">
                      By texting this number, you agree to receive text messages
                      from our business.
                    </p>

                  <Button
                    asChild
                    variant="outline"
                    className="justify-start gap-2"
                  >
                    <a href={`mailto:${business.contact.email}`}>
                      <Mail className="h-4 w-4" />
                      Email: {business.contact.email}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  On this page
                </p>
                <nav className="mt-4 grid gap-2 text-sm">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "features", label: "Key features" },
                    ...(detail.details.uniqueAgents?.length
                      ? [{ id: "agents", label: "AI agents" }]
                      : []),
                    { id: "process", label: "Process" },
                    { id: "benefits", label: "Benefits" },
                    ...(related.length
                      ? [{ id: "related", label: "Related" }]
                      : []),
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="rounded-lg px-3 py-2 hover:bg-background/60 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {!!detail.details.stats?.length && (
                <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Service stats
                  </p>
                  <div className="mt-4 grid gap-4">
                    {detail.details.stats.map((s) => (
                      <div key={s.label}>
                        <p className="text-xs text-muted-foreground">
                          {s.label}
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section className="section-wrapper">
        <div id="related" className="section-container">
          <SectionHeader
            badge="Explore"
            title="Related services"
            description="Pair services for a complete revenue cycle strategy."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {related.map((svc) => {
              const Icon = getIcon(svc.icon);

              return (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="group rounded-2xl border border-border/60 bg-background shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/25"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                    <div
                      className={cn(
                        "absolute left-4 bottom-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg border border-white/15",
                        gradientClass(svc.gradient, {
                          direction: "br",
                        }),
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold leading-snug line-clamp-2">
                      {svc.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {svc.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <FAQSection faqs={detail.details.faqs} className="bg-muted" />
    </>
  );
}


