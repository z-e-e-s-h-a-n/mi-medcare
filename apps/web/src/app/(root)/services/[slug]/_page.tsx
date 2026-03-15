"use client";

import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/layout/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { SERVICES } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";
import { ServicesSection } from "@/components/sections/services-section";

export type ServiceDetail = {
  slug: string;
  title: string;
  badge: string;
  heroDescription: string;
  overview: {
    title: string;
    body: string;
    bullets: string[];
  };
  outcomes: {
    title: string;
    description: string;
  }[];
  deliverables: {
    title: string;
    description: string;
  }[];
  process: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
};

const getServiceSlug = (href: string) =>
  href.split("/").filter(Boolean).pop() ?? href;

interface ServiceDetailsProps {
  detail: ServiceDetail;
  slug: string;
}

export async function ServiceDetails({ detail, slug }: ServiceDetailsProps) {
  const relatedServices = SERVICES.filter((service) =>
    detail.relatedSlugs.includes(getServiceSlug(service.href)),
  );
  const fallbackRelated =
    relatedServices.length > 0
      ? relatedServices
      : SERVICES.filter(
          (service) => getServiceSlug(service.href) !== slug,
        ).slice(0, 3);

  return (
    <>
      <PageHeader
        title={detail.title}
        badge={detail.badge}
        description={detail.heroDescription}
      />

      <section className="section-wrapper">
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
              <h3 className="text-lg font-semibold">Key Focus Areas</h3>
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

      <section className="section-wrapper bg-muted">
        <div className="section-container">
          <SectionHeader
            badge="Outcomes"
            title="Results you can expect"
            description="Focused improvements that move revenue performance in the right direction."
        imageUrl="https://images.pexels.com/photos/4989167/pexels-photo-4989167.jpeg?auto=compress&cs=tinysrgb&w=1920"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {detail.outcomes.map((item) => (
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

      <section className="section-wrapper">
        <div className="section-container">
          <SectionHeader
            badge="Deliverables"
            title="What we deliver"
            description="Clear, tangible outputs that improve accuracy, speed, and visibility."
        imageUrl="https://images.pexels.com/photos/4989167/pexels-photo-4989167.jpeg?auto=compress&cs=tinysrgb&w=1920"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {detail.deliverables.map((item) => (
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

      <section className="section-wrapper bg-muted">
        <div className="section-container">
          <SectionHeader
            badge="Process"
            title="How implementation works"
            description="A structured approach that minimizes disruption and delivers results quickly."
        imageUrl="https://images.pexels.com/photos/4989167/pexels-photo-4989167.jpeg?auto=compress&cs=tinysrgb&w=1920"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {detail.process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <p className="text-xs font-semibold text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      <FAQSection faqs={detail.faqs} className="bg-muted" />

      <ServicesSection
        badge="Explore More"
        title="Related services"
        description="Combine services for a more complete revenue cycle strategy."
        services={fallbackRelated}
      />

      <CTASection />
    </>
  );
}

