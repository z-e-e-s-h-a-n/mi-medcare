"use client";

import { motion } from "motion/react";
import { TRUST_METRICS } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { cn } from "@workspace/ui/lib/utils";

interface MetricsSectionProps {
  className?: string;
}

export function MetricsSection({ className }: MetricsSectionProps) {
  return (
    <section className={cn("section-wrapper py-8 bg-primary/10", className)}>
      <div className="section-container">
        <h2 className="sr-only">
          Trust metrics that prove MI MedCare performance
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {TRUST_METRICS.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center group"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 mb-4 flex items-center justify-center rounded-full ${gradientClass(metric.gradient)} text-white shadow-sm`}
                >
                  <Icon className="size-6" />
                </div>

                {/* Subtitle */}
                <p className="text-sm text-muted-foreground">
                  {metric.subtitle}
                </p>

                {/* Title */}
                <h3 className="mt-1 font-semibold text-foreground">
                  {metric.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
