import type { Metadata } from "next";

import Image from "next/image";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the leaders behind MI MedCare.",
};

const leadershipTeam = [
  {
    name: "Dr. Maya Ibrahim",
    title: "Founder & Chief Executive Officer",
    imageUrl:
      "https://images.pexels.com/photos/7580995/pexels-photo-7580995.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bio: "Leads MI MedCare with a focus on compliant, technology-enabled revenue cycle operations. Experienced in practice transformation, patient billing workflows, and payer strategy.",
    focus: ["RCM strategy", "Client outcomes", "Compliance-first operations"],
  },
  {
    name: "Daniel Carter",
    title: "Chief Operating Officer",
    imageUrl:
      "https://images.pexels.com/photos/3772616/pexels-photo-3772616.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bio: "Oversees delivery teams, onboarding, and performance execution. Focused on clean-claim rate improvements, faster reimbursement cycles, and scalable operations.",
    focus: ["Operations", "Onboarding", "Quality & KPIs"],
  },
  {
    name: "Aisha Khan",
    title: "VP, Revenue Cycle Management",
    imageUrl:
      "https://images.pexels.com/photos/5212322/pexels-photo-5212322.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bio: "Owns end-to-end RCM performance across specialties. Partners with practices to reduce denials, improve collections, and tighten documentation-to-claim workflows.",
    focus: ["Denials", "AR performance", "Payer follow-up"],
  },
  {
    name: "Michael Reyes",
    title: "Director, Compliance & Security",
    imageUrl:
      "https://images.pexels.com/photos/5668481/pexels-photo-5668481.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bio: "Guides HIPAA-aware processes and secure operations. Works with teams to maintain policy discipline, risk reduction, and strong client trust.",
    focus: ["HIPAA", "Security controls", "Process governance"],
  },
] as const;

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        title="Leadership"
        subtitle="Company"
        description="Meet the leaders behind MI MedCare."
        imageUrl="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="section-wrapper py-14">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary">Our leadership</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Experienced operators for modern medical billing
            </h2>
            <p className="mt-4 text-muted-foreground">
              We combine healthcare revenue cycle expertise with process
              discipline and technology-forward delivery. Our leadership team
              focuses on measurable outcomes: cleaner claims, faster cash, and
              better visibility.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {leadershipTeam.map((person) => (
              <Card key={person.name} className="overflow-hidden">
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={person.imageUrl}
                    alt={`${person.name} portrait`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader className="gap-1">
                  <CardTitle className="text-base">{person.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {person.title}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{person.bio}</p>
                  <div className="rounded-xl bg-muted/30 p-3">
                    <p className="text-xs font-semibold text-foreground">
                      Focus areas
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      {person.focus.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border bg-muted/20 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  Want to talk to our team?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get a quick assessment and a clear plan to improve claim
                  quality and collections.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Button href="/contact" size="lg">
                  Contact us
                </Button>
                <Button href="/services" variant="outline" size="lg">
                  Explore services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
