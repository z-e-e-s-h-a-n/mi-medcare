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
    <section className={cn("section-container", className)}>
      <SectionHeader
        badge="Why Choose Us"
        title="Powerful Features for Modern Practices"
        description="Leverage cutting-edge technology to optimize your revenue cycle"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative p-8 rounded-2xl border bg-linear-to-br from-background to-muted/30"
            >
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    useConstantColors
                      ? `${gradientClass(feature.gradient, { direction: "br" })} text-white`
                      : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      useConstantColors ? "text-white" : "text-primary"
                    }`}
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      useConstantColors ? "text-foreground/70" : "text-primary"
                    }`}
                  />
                  <span
                    className={
                      useConstantColors
                        ? gradientClass(feature.gradient, { type: "text" })
                        : "text-primary"
                    }
                  >
                    {feature.stats}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
