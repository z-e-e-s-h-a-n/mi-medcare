"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, Sparkles } from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { business } from "@/lib/constants";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

export interface ComingSoonSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  backHref?: string;
  className?: string;
}

const ORB_TRANSITION = {
  duration: 10,
  repeat: Infinity as const,
  ease: "easeInOut" as const,
};

export function ComingSoonSection({
  badge = "Coming Soon",
  title = "We are preparing something exciting & amazing for you.",
  description = "This page is under construction. Meanwhile, you can contact our team or explore our services and specialties.",
  backHref = "/",
  className,
}: ComingSoonSectionProps) {
  return (
    <section className={cn("section-wrapper relative overflow-hidden", className)}>
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-background via-muted/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(circle_at_60%_10%,rgba(236,72,153,0.08),transparent_55%)]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="section-container py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <SectionHeader
              badge={badge}
              title={title}
              description={description}
              center={false}
            />

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/contact" size="lg" className="group">
                Contact us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href={backHref} size="lg" variant="outline" className="group">
                Back to home
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
                {business.email}
              </Link>
              <Link
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                {business.phone}
              </Link>
            </div>
          </div>

          {/* right visual card */}
          <div className="relative rounded-3xl border border-border/60 bg-background/70 backdrop-blur-xl p-6 shadow-sm overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />
            </div>

            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
              transition={ORB_TRANSITION}
              className="absolute -right-24 -top-24 size-80 rounded-full bg-linear-to-br from-primary/30 to-secondary/25 blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 16, 0], rotate: [0, -2, 0] }}
              transition={{ ...ORB_TRANSITION, duration: 12 }}
              className="absolute -left-24 -bottom-24 size-80 rounded-full bg-linear-to-br from-fuchsia-500/15 to-primary/20 blur-3xl"
            />

            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />
              Coming Soon
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              We’re building this page with new content, visuals, and guides.
              Check back soon.
            </p>

            {/* animated graph */}
            <div className="mt-6 rounded-2xl border bg-muted/20 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Progress
              </p>
              <svg
                viewBox="0 0 600 120"
                className="mt-3 w-full"
                role="img"
                aria-label="Progress graph"
              >
                <defs>
                  <linearGradient id="cs-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgb(59,130,246)" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="rgb(99,102,241)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="rgb(236,72,153)" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                <path
                  d="M0 95 C 90 30, 180 110, 270 60 S 450 25, 600 55"
                  fill="none"
                  stroke="url(#cs-grad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-80"
                />

                <motion.path
                  d="M0 95 C 90 30, 180 110, 270 60 S 450 25, 600 55"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  strokeDasharray="10 14"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
              </svg>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["Design", "Content", "Launch"].map((step, idx) => (
                  <div key={step} className="rounded-xl bg-background/60 p-4">
                    <p className="text-xs text-muted-foreground">Step {idx + 1}</p>
                    <p className="mt-1 font-semibold">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
