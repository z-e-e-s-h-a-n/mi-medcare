"use client";

import { motion } from "motion/react";
import { IconMap } from "@/lib/icons";

export interface MetricItem {
  subtitle: string;
  title: string;
  icon: IconType;
}

interface TrustMetricsSectionProps {
  metrics: MetricItem[];
}

export function MetricsSection({ metrics }: TrustMetricsSectionProps) {
  return (
    <section className="section-container bg-primary/10 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        {metrics.map((metric, index) => {
          const Icon = IconMap[metric.icon];

          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center"
            >
              {/* Icon */}
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Icon className="size-6" />
              </div>

              {/* Subtitle */}
              <p className="text-sm text-muted-foreground">{metric.subtitle}</p>

              {/* Title */}
              <h3 className="mt-1  font-semibold text-foreground">
                {metric.title}
              </h3>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
