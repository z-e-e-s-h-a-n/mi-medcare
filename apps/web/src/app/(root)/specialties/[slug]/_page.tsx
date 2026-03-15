"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ComponentType } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Code2,
  FileText,
  Mail,
  Phone,
  ShieldAlert,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { FAQSection } from "@/components/sections/faq-section";
import { business, SPECIALTIES } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

export type SpecialtyDetailsContent = {
  overview: string;
  keyChallenges: string[];
  ourSolutions: string[];
  keyFeatures: string[];
  codingComplexities: string[];
  commonCodes: string[];
  denialTriggers: string[];
  stats: {
    label: string;
    value: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export type SpecialtyData = {
  title: string;
  href: string;
  icon: string;
  description: string;
  gradient: string;
  details: SpecialtyDetailsContent;
};

type IconComponent = ComponentType<{ className?: string }>;

const getSlug = (href: string) => href.split("/").filter(Boolean).pop() ?? href;

const stripBoldMarkers = (text: string) => text.replace(/\*\*/g, "").trim();

const splitLabel = (line: string) => {
  const normalized = stripBoldMarkers(line);
  const idx = normalized.indexOf(":");
  if (idx === -1)
    return { label: undefined as string | undefined, value: normalized };
  return {
    label: normalized.slice(0, idx).trim(),
    value: normalized.slice(idx + 1).trim(),
  };
};

interface SpecialtyDetailsProps {
  detail: SpecialtyData;
  slug: string;
}

export function SpecialtyDetails({ detail, slug }: SpecialtyDetailsProps) {
  const accent = SPECIALTIES.find((s) => getSlug(s.href) === slug);
  const AccentIcon = (accent?.icon as IconComponent | undefined) ?? undefined;

  const accentGradient =
    detail.gradient || accent?.gradient || "from-primary to-secondary";

  const stats = Array.isArray(detail.details?.stats)
    ? detail.details.stats
    : [];
  const highlightStat = stats[0]?.value ?? "Specialty billing";

  const sections = [
    { id: "overview", label: "Overview", show: !!detail.details?.overview },
    {
      id: "challenges",
      label: "Challenges",
      show: (detail.details?.keyChallenges ?? []).length > 0,
    },
    {
      id: "solutions",
      label: "Solutions",
      show: (detail.details?.ourSolutions ?? []).length > 0,
    },
    {
      id: "features",
      label: "Key features",
      show: (detail.details?.keyFeatures ?? []).length > 0,
    },
    {
      id: "coding",
      label: "Coding",
      show: (detail.details?.codingComplexities ?? []).length > 0,
    },
    {
      id: "denials",
      label: "Denial triggers",
      show: (detail.details?.denialTriggers ?? []).length > 0,
    },
    {
      id: "codes",
      label: "Common codes",
      show: (detail.details?.commonCodes ?? []).length > 0,
    },
    { id: "faq", label: "FAQ", show: (detail.details?.faqs ?? []).length > 0 },
    { id: "related", label: "Related", show: SPECIALTIES.length > 1 },
  ].filter((s) => s.show);

  const related = SPECIALTIES.filter((s) => getSlug(s.href) !== slug).slice(
    0,
    6,
  );

  return (
    <>
      <PageHeader
        title={detail.title}
        badge={highlightStat}
        description={detail.description}
      />

      {/* Top summary cards */}
      <section className="section-wrapper -mt-10 pb-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="grid gap-4 md:grid-cols-3"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur-xl",
                gradientClass(accentGradient, { opacity: 8, direction: "br" }),
              )}
            >
              <div className="absolute -right-10 -top-10 opacity-[0.08]">
                {AccentIcon ? <AccentIcon className="size-36" /> : null}
              </div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Specialty highlight
              </p>
              <p className="mt-2 text-2xl font-bold">{highlightStat}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Built around payer rules, documentation requirements, and coding
                nuances.
              </p>
            </div>

            {(stats.length
              ? stats
              : [{ label: "Clean Claim Rate", value: "—" }]
            )
              .slice(0, 2)
              .map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur-xl"
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
          </motion.div>
        </div>
      </section>

      {/* Main layout */}
      <section className="section-wrapper relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
            <div className="space-y-16">
              {/* Overview */}
              <div id="overview" className="scroll-mt-24">
                <SectionHeader
                  badge="Overview"
                  title={`Billing in ${detail.title}`}
                  description="A practical view of what makes this specialty unique."
                  center={false}
                />
                <div className="rounded-2xl border bg-background/70 backdrop-blur-xl p-7 shadow-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    {detail.details?.overview}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {(detail.details?.keyFeatures ?? [])
                      .slice(0, 4)
                      .map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 rounded-xl bg-muted/30 p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                          <div>
                            <p className="font-semibold leading-snug">
                              {feature}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Standardized into our workflow to reduce rework
                              and protect revenue.
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Challenges + solutions */}
              <div id="challenges" className="scroll-mt-24">
                <SectionHeader
                  badge="Challenges"
                  title="What slows reimbursement"
                  description="The common friction points that trigger delays, denials, and rework."
                  center={false}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border bg-background/70 backdrop-blur-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Key challenges
                    </div>
                    <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
                      {(detail.details?.keyChallenges ?? []).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    id="solutions"
                    className="scroll-mt-24 rounded-2xl border bg-background/70 backdrop-blur-xl p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                      Our solutions
                    </div>
                    <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
                      {(detail.details?.ourSolutions ?? []).map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key features */}
              <div id="features" className="scroll-mt-24">
                <SectionHeader
                  badge="Features"
                  title="Operational features that keep claims clean"
                  description="Repeatable checks, payer alignment, and tight charge capture."
                  center={false}
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {(detail.details?.keyFeatures ?? []).map((feature) => (
                    <div
                      key={feature}
                      className="rounded-2xl border bg-background/70 backdrop-blur-xl p-6 shadow-sm"
                    >
                      <div
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-xl text-white",
                          gradientClass(accentGradient, { direction: "br" }),
                        )}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <p className="mt-4 font-semibold">{feature}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Included to improve first-pass acceptance and reduce
                        downstream edits.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coding + denials */}
              <div id="coding" className="scroll-mt-24">
                <SectionHeader
                  badge="Coding"
                  title="Coding complexities we watch closely"
                  description="Modifier usage, documentation rules, and specialty-specific payer edits."
                  center={false}
                />

                <div className="rounded-2xl border bg-background/70 backdrop-blur-xl p-6 shadow-sm">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <div className="flex items-center gap-2 font-semibold">
                        <Code2 className="h-5 w-5 text-primary" />
                        Complexity checklist
                      </div>
                      <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
                        {(detail.details?.codingComplexities ?? []).map(
                          (item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                              <span>{item}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div id="denials" className="scroll-mt-24">
                      <div className="flex items-center gap-2 font-semibold">
                        <ShieldAlert className="h-5 w-5 text-primary" />
                        Denial triggers
                      </div>
                      <div className="mt-5 grid gap-3">
                        {(detail.details?.denialTriggers ?? []).map((item) => (
                          <div
                            key={item}
                            className="rounded-xl border bg-muted/30 p-4"
                          >
                            <p className="text-sm text-muted-foreground">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common codes */}
              <div id="codes" className="scroll-mt-24">
                <SectionHeader
                  badge="Codes"
                  title="Common codes (examples)"
                  description="Reference-only examples to illustrate the typical coding landscape."
                  center={false}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  {(detail.details?.commonCodes ?? []).map((line) => {
                    const { label, value } = splitLabel(line);
                    return (
                      <div
                        key={line}
                        className="rounded-2xl border bg-background/70 backdrop-blur-xl p-6 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            {label ?? "Codes"}
                          </p>
                        </div>
                        <p className="mt-3 text-sm font-medium text-foreground leading-relaxed">
                          {value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
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
                  {sections.map((item) => (
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

              <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  At a glance
                </p>
                <div className="mt-4 grid gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Specialty</p>
                    <p className="text-lg font-semibold text-foreground">
                      {detail.title}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">
                        Challenges
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {(detail.details?.keyChallenges ?? []).length}
                      </p>
                    </div>
                    <div className="rounded-xl bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">Features</p>
                      <p className="mt-1 text-lg font-semibold">
                        {(detail.details?.keyFeatures ?? []).length}
                      </p>
                    </div>
                    <div className="rounded-xl bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">FAQs</p>
                      <p className="mt-1 text-lg font-semibold">
                        {(detail.details?.faqs ?? []).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FAQSection faqs={detail.details?.faqs} className="bg-muted" />
      {/* Related */}
      {!!related.length && (
        <section id="related" className="section-wrapper scroll-mt-24">
          <div className="section-container">
            <SectionHeader
              badge="Related"
              title="Explore other specialties"
              description="More specialty billing expertise across common practice types."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group rounded-2xl border bg-background/70 backdrop-blur-xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className={cn(
                        "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white",
                        gradientClass(s.gradient, { direction: "br" }),
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {s.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}




