"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

import { FEATURES } from "@/lib/constants";
import { SectionHeader } from "@/components/layout/section-header";
import { gradientClass } from "@/lib/utils";
import { cn } from "@workspace/ui/lib/utils";

interface FeaturesSectionProps {
  useConstantColors?: boolean;
  className?: string;
}

export function FeaturesSection({
  useConstantColors = true,
  className,
}: FeaturesSectionProps) {
  return (
    <section className={cn("section-wrapper", className)}>
      <div className="section-container">
        <SectionHeader
          badge="MI Features"
          title="Powerful Features for Modern Practices"
          description="Leverage cutting-edge technology to optimize your revenue cycle"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn(
                  "group relative p-8 rounded-2xl border bg-linear-to-br from-primary/10 to-accent/10 transition-colors duration-300",
                  !useConstantColors &&
                    "hover:from-primary hover:to-primary/70 hover:text-primary-foreground",
                )}
              >
                <div className="relative">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                      useConstantColors
                        ? `${gradientClass(feature.gradient, { direction: "br" })} text-white`
                        : "bg-primary/10 group-hover:bg-primary-foreground/10",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-colors",
                        useConstantColors
                          ? "text-white"
                          : "text-primary group-hover:text-primary-foreground",
                      )}
                    />
                  </div>

                  <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-primary-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 transition-colors group-hover:text-primary-foreground/80">
                    {feature.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2
                      className={cn(
                        "w-4 h-4 transition-colors",
                        useConstantColors
                          ? "text-foreground/70"
                          : "text-primary group-hover:text-primary-foreground",
                      )}
                    />

                    <span
                      className={cn(
                        "transition-colors",
                        useConstantColors
                          ? gradientClass(feature.gradient, { type: "text" })
                          : "text-primary group-hover:text-primary-foreground",
                      )}
                    >
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
