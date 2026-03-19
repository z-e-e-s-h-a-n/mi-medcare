"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { SPECIALTIES } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { SectionHeader } from "../layout/section-header";

interface SpecialtiesSectionProps {
  limit?: number;
  className?: string;
  useConstantColors?: boolean;
}

export function SpecialtiesSection({
  limit,
  className,
  useConstantColors = true,
}: SpecialtiesSectionProps) {
  const displaySpecialties = limit ? SPECIALTIES.slice(0, limit) : SPECIALTIES;

  return (
    <section
      className={cn(
        "section-wrapper relative overflow-hidden bg-background",
        className,
      )}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?cs=srgb&dl=pexels-pixabay-263402.jpg&fm=jpg&w=1920')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-background/70 via-muted/45 to-prim/20" />
      </div>

      <SectionHeader
        title={` Medical Billing for ${SPECIALTIES.length}+ Specialties`}
        description="We provide specialty-focused medical billing services designed for primary care practices, surgical centers, and specialty clinics."
        className="relative"
      />

      <div className="relative section-container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displaySpecialties.map((specialty, index) => {
            const Icon = specialty.icon;

            return (
              <motion.div
                key={specialty.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -6 }}
                className="w-full"
              >
                <Link
                  className={cn(
                    "group relative flex flex-col w-full items-center gap-3 rounded-xl border bg-background p-4 hover:shadow-lg transition-all",
                    useConstantColors
                      ? "hover:border-border/80"
                      : "hover:border-primary/40",
                  )}
                  href={specialty.href}
                >
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl transition-opacity duration-300",
                      gradientClass(specialty.gradient, { direction: "br" }),
                      "opacity-5 group-hover:opacity-10",
                    )}
                  />

                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
                      useConstantColors
                        ? `${gradientClass(specialty.gradient, { direction: "br" })} text-white`
                        : "bg-primary/10",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        useConstantColors ? "text-white" : "text-primary",
                      )}
                    />
                  </div>

                  <div className="flex flex-col items-center flex-1">
                    <span className="text-sm font-medium leading-tight text-center mb-1">
                      {specialty.title}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {limit && SPECIALTIES.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              href="/specialties"
              size="lg"
              className="group px-8 py-6 text-base"
            >
              View All {SPECIALTIES.length} Specialties
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
