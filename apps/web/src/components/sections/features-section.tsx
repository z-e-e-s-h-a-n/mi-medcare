"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { FEATURES } from "@/lib/constants";
import { SectionHeader } from "@/components/layout/section-header";
import { cn } from "@workspace/ui/lib/utils";
import { gradientClass } from "@/lib/utils";

interface FeaturesSectionProps {
  useConstantColors?: boolean;
  className?: string;
}

export function FeaturesSection({
  useConstantColors = false,
  className,
}: FeaturesSectionProps) {
  return (
    <section className={cn("section-wrapper", className)}>
      <div className="section-container">
        <SectionHeader
          subtitle="MI Features"
          title="Powerful Features for Modern Practices"
          description="Leverage cutting-edge technology to optimize your revenue cycle"
        />

        {/* Mobile-first grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "group relative overflow-hidden rounded-xl sm:rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:shadow-lg",
                  useConstantColors
                    ? gradientClass(feature.gradient, { opacity: 10 })
                    : "hover:border-primary/30",
                )}
              >
                {/* Image header */}
                {feature.image ? (
                  <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.05]">
                      <Image
                        src={feature.image}
                        alt={`${feature.title} photo`}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/30 to-transparent" />
                    </div>

                    {/* Floating icon */}
                    <div
                      className={cn(
                        "absolute left-4 bottom-4 w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-md border border-white/20",
                        useConstantColors
                          ? `text-primary-foreground ${gradientClass(feature.gradient)}`
                          : "bg-primary text-primary-foreground",
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                ) : (
                  <div className="h-32 sm:h-36 md:h-40 bg-muted" />
                )}

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold leading-snug">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div
                    className={cn(
                      "mt-4 flex items-center gap-2 text-xs sm:text-sm",
                      useConstantColors &&
                        gradientClass(feature.gradient, { type: "text" }),
                    )}
                  >
                    <CheckCircle2 className="w-4 h-4 text-foreground/70 shrink-0" />

                    <span className="font-medium text-primary">
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
