import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Clock3 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { PageHeader } from "@/components/layout/page-header";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Careers at MI MedCare",
  description:
    "Work with a team focused on better billing outcomes, better provider experience, and better healthcare operations.",
};

const openRoles = [
  {
    title: "Medical Billing Specialist",
    type: "Full-time",
    location: "Remote, US",
    summary:
      "Manage claim lifecycle workflows, payer follow-up, and reimbursement accuracy for multi-specialty clients.",
  },
  {
    title: "Certified Medical Coder",
    type: "Full-time",
    location: "Remote, US",
    summary:
      "Apply CPT, ICD-10, and HCPCS coding standards with strong quality control and compliance documentation.",
  },
  {
    title: "RCM Account Manager",
    type: "Full-time",
    location: "Sacramento, CA / Hybrid",
    summary:
      "Lead client communication, KPI tracking, and process improvements across assigned healthcare accounts.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers at MI MedCare"
        badge="Join Our Team"
        description="Work with a team focused on better billing outcomes, better provider experience, and better healthcare operations."
        imageUrl="https://images.pexels.com/photos/6914012/pexels-photo-6914012.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="section-wrapper">
        <div className="section-container">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl font-bold mb-3">
              Build Your Career in RCM
            </h2>
            <p className="text-muted-foreground">
              We hire people who care about precision, accountability, and
              measurable outcomes. If you want to solve real billing challenges
              for healthcare practices, we want to hear from you.
            </p>
          </div>

          <div className="grid gap-6">
            {openRoles.map((role) => (
              <article key={role.title} className="rounded-2xl border p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    <Briefcase className="h-3.5 w-3.5" />
                    {role.type}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                    <MapPin className="h-3.5 w-3.5" />
                    {role.location}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                <p className="text-muted-foreground mb-5">{role.summary}</p>

                <Button asChild variant="outline">
                  <Link href="/contact">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrapper pt-0">
        <div className="section-container">
          <div className="rounded-2xl border bg-muted/30 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-3">Hiring Process</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-background p-4 border">
                <p className="font-semibold mb-1">1. Initial Review</p>
                <p className="text-sm text-muted-foreground">
                  Resume screening and role-fit assessment.
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border">
                <p className="font-semibold mb-1">2. Interview Rounds</p>
                <p className="text-sm text-muted-foreground">
                  Technical and practical workflow discussions.
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border">
                <p className="font-semibold mb-1">3. Final Decision</p>
                <p className="text-sm text-muted-foreground">
                  Offer and onboarding timeline confirmation.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              Typical hiring cycle: 2 to 3 weeks
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

