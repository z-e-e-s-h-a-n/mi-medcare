"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { SPECIALTIES } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { CheckCircle2, ArrowRight } from "lucide-react";

export type SpecialtyDetail = {
  slug: string;
  title: string;
  badge: string;
  heroDescription: string;
  overview: {
    title: string;
    body: string;
    bullets: string[];
  };
  challenges: {
    title: string;
    description: string;
  }[];
  focusAreas: {
    title: string;
    description: string;
  }[];
  codingFocus: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
};

const getSpecialtySlug = (href: string) =>
  href.split("/").filter(Boolean).pop() ?? href;

interface SpecialtyDetailsProps {
  detail: SpecialtyDetail;
  slug: string;
}

export function SpecialtyDetails({ detail, slug }: SpecialtyDetailsProps) {
  const relatedSpecialties = SPECIALTIES.filter((specialty) =>
    detail.relatedSlugs.includes(getSpecialtySlug(specialty.href)),
  );

  const fallbackRelated =
    relatedSpecialties.length > 0
      ? relatedSpecialties
      : SPECIALTIES.filter(
          (specialty) => getSpecialtySlug(specialty.href) !== slug,
        ).slice(0, 3);

  return (
    <>
      <PageHeader
        title={detail.title}
        badge={detail.badge}
        description={detail.heroDescription}
      />

      <section className="section-wrapper py-16">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeader
                badge="Overview"
                title={detail.overview.title}
                description={detail.overview.body}
                center={false}
              />
            </div>
            <div className="rounded-2xl border bg-muted/40 p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Billing Focus Areas</h3>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                {detail.overview.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrapper py-16 bg-muted">
        <div className="section-container">
          <SectionHeader
            badge="Challenges"
            title="Common specialty billing challenges"
            description="We address the issues that most often slow reimbursement."
        imageUrl="https://images.pexels.com/photos/5407210/pexels-photo-5407210.jpeg?auto=compress&cs=tinysrgb&w=1920"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {detail.challenges.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrapper py-16">
        <div className="section-container">
          <SectionHeader
            badge="Focus"
            title="How we support your specialty"
            description="Targeted workflows built around your clinical and payer needs."
        imageUrl="https://images.pexels.com/photos/5407210/pexels-photo-5407210.jpeg?auto=compress&cs=tinysrgb&w=1920"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {detail.focusAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrapper py-16 bg-muted">
        <div className="section-container">
          <SectionHeader
            badge="Coding"
            title="Coding and documentation priorities"
            description="Key areas we monitor to keep claims clean and compliant."
        imageUrl="https://images.pexels.com/photos/5407210/pexels-photo-5407210.jpeg?auto=compress&cs=tinysrgb&w=1920"
          />
          <div className="flex flex-wrap gap-3">
            {detail.codingFocus.map((item) => (
              <span
                key={item}
                className="rounded-full border bg-background px-4 py-2 text-sm font-medium text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQSection className="py-16" faqs={detail.faqs} />

      <section className="section-wrapper py-16">
        <div className="section-container">
          <SectionHeader
            badge="Related"
            title="Related specialties"
            description="Explore other specialties we support."
        imageUrl="https://images.pexels.com/photos/5407210/pexels-photo-5407210.jpeg?auto=compress&cs=tinysrgb&w=1920"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fallbackRelated.map((specialty) => {
              const Icon = specialty.icon;
              return (
                <div
                  key={specialty.title}
                  className="group rounded-2xl border bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white ${gradientClass(
                      specialty.gradient,
                      { direction: "br" },
                    )}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{specialty.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {specialty.description}
                  </p>
                  <Link
                    href={specialty.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

