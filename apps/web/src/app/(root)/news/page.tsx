import type { Metadata } from "next";

import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";

export const metadata: Metadata = {
  title: "News & Press",
  description: "Announcements, updates, and press releases from MI MedCare.",
};

const newsItems = [
  {
    date: "March 2026",
    category: "Company Update",
    title: "MI MedCare expands onboarding support for multi-location practices",
    excerpt:
      "We enhanced our onboarding playbook to speed up integrations and reduce disruption for multi-location groups, with clear milestone tracking and KPI baselines.",
  },
  {
    date: "February 2026",
    category: "Compliance",
    title: "Process updates to strengthen privacy-aware billing workflows",
    excerpt:
      "We rolled out new internal controls and review steps that help reduce PHI exposure risks while keeping teams fast and consistent across specialties.",
  },
  {
    date: "January 2026",
    category: "Technology",
    title: "Improved reporting snapshots for AR aging and denial trends",
    excerpt:
      "New reporting snapshots make it easier to see what is driving AR days and denials, and where to focus follow-up to recover revenue faster.",
  },
  {
    date: "December 2025",
    category: "Client Success",
    title: "Clean-claim improvements for high-volume specialties",
    excerpt:
      "Our team refined claim scrubbing and documentation checks to raise clean-claim rates and reduce avoidable rework for high-volume specialty clinics.",
  },
  {
    date: "November 2025",
    category: "Press Mention",
    title: "Healthcare operations spotlight: the case for measurable RCM",
    excerpt:
      "A short spotlight on why practices are moving toward KPI-driven billing partners—and what to measure to improve reimbursement outcomes.",
  },
  {
    date: "October 2025",
    category: "Announcement",
    title: "Expanded coverage for EMR/EHR billing support",
    excerpt:
      "We broadened our EMR/EHR support coverage to help practices maintain smooth claim workflows without changing their current platform.",
  },
] as const;

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="News & Press"
        subtitle="Company"
        description="Announcements, updates, and press releases from MI MedCare."
        imageUrl="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="section-wrapper py-14">
        <div className="section-container">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="space-y-6">
              {newsItems.map((item) => (
                <Card
                  key={`${item.title}-${item.date}`}
                  className="overflow-hidden"
                >
                  <CardHeader className="gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-snug">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border bg-muted/20 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Media inquiries
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  For press and partnership questions, reach our team and
                  we&apos;ll respond soon.
                </p>
                <div className="mt-4 grid gap-3">
                  <Button href="/contact" size="lg">
                    Contact us
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/privacy">Privacy Policy</Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border bg-background p-6">
                <p className="text-sm font-semibold">
                  Want the latest updates?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Follow our resources for articles, FAQs, and case studies.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/blogs">Blog</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/case-studies">Case Studies</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/faqs">FAQs</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
