"use client";

import { motion } from "motion/react";
import { TRUST_METRICS } from "@/lib/constants";
import { gradientClass } from "@/lib/gradient";

interface MetricsSectionProps {
  useConstantColors?: boolean;
}

export function MetricsSection({ useConstantColors = false }: MetricsSectionProps) {
  const accent = TRUST_METRICS[0]?.gradient ?? "blue-500 cyan-500";
  return (
    <section
      className={`section-container py-8 ${
        useConstantColors ? "relative overflow-hidden" : "bg-primary/10"
      }`}
    >
      {useConstantColors && (
        <div
          className={`absolute inset-0 -z-10 ${gradientClass(accent, { opacity: 8 })}`}
        />
      )}
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
              <p className="text-sm text-muted-foreground">{metric.subtitle}</p>

              {/* Title */}
              <h3 className="mt-1 font-semibold text-foreground">
                {metric.title}
              </h3>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
