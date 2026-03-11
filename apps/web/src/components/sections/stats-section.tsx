"use client";

import { motion } from "motion/react";
import CountUp from "react-countup";
import { COMPANY_STATS } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { cn } from "@workspace/ui/lib/utils";

interface SuccessMetricsProps {
  useConstantColors?: boolean;
  className?: string;
}

export function SuccessMetrics({
  useConstantColors = false,
  className,
}: SuccessMetricsProps) {
  const bgA = COMPANY_STATS[0]?.gradient ?? "blue-500 cyan-500";
  const bgB = COMPANY_STATS[1]?.gradient ?? "purple-500 pink-500";
  return (
    <section
      className={cn("relative overflow-hidden py-24", className)}
    >
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-20">
          <div
            className={`absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent to-transparent ${
              useConstantColors ? "via-foreground/10" : "via-primary/20"
            }`}
          />
          <div
            className={`absolute top-0 left-2/4 w-px h-full bg-linear-to-b from-transparent to-transparent ${
              useConstantColors ? "via-foreground/10" : "via-secondary/20"
            }`}
          />
          <div
            className={`absolute top-0 left-3/4 w-px h-full bg-linear-to-b from-transparent to-transparent ${
              useConstantColors ? "via-foreground/10" : "via-primary/20"
            }`}
          />
        </div>

        {/* Floating orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl ${
            useConstantColors
              ? gradientClass(bgA, { direction: "br", opacity: 8 })
              : "bg-primary/5"
          }`}
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-20 left-20 w-64 h-64 rounded-full blur-3xl ${
            useConstantColors
              ? gradientClass(bgB, { direction: "br", opacity: 8 })
              : "bg-secondary/5"
          }`}
        />
      </div>

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Numbers</span> That Speak
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to excellence reflected in real results
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_STATS.map((metric, index) => {
            const isRevenueImprovement = metric.label === "Revenue Improvement";
            const metricAccent = metric.gradient ?? "blue-500 cyan-500";

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="relative h-full bg-linear-to-br from-background via-background to-background/50 backdrop-blur-sm border rounded-2xl p-6 overflow-hidden">
                  {/* Background decoration */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl ${
                      useConstantColors
                        ? gradientClass(metricAccent, {
                            direction: "br",
                            opacity: 12,
                          })
                        : "bg-linear-to-br from-primary/5 to-secondary/5"
                    }`}
                  />

                  {/* Icon with rotation */}
                  <div className="relative mb-4">
                    <motion.div
                      whileInView={{ rotate: [0, 360] }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                        useConstantColors
                          ? `${gradientClass(metricAccent, { direction: "br" })} border-white/15`
                          : "bg-linear-to-br from-primary/10 to-secondary/10 border-primary/20"
                      }`}
                    >
                      <metric.icon
                        className={`size-5 ${
                          useConstantColors ? "text-white" : "text-primary"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Value */}
                  <div className="space-y-1 mb-3">
                    {isRevenueImprovement ? (
                      <div
                        className={`text-3xl lg:text-4xl font-bold ${
                          useConstantColors
                            ? gradientClass(metricAccent, { type: "text" })
                            : "bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
                        }`}
                      >
                        5-10%
                      </div>
                    ) : (
                      <div className="text-3xl lg:text-4xl font-bold">
                        {metric.prefix}
                        <CountUp
                          end={metric.value}
                          duration={2.5}
                          separator=","
                          suffix={metric.suffix}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {metric.label}
                  </p>

                  {/* Progress bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.8 }}
                    className={`absolute bottom-0 left-0 h-0.5 origin-left ${
                      useConstantColors
                        ? gradientClass(metricAccent)
                        : "bg-linear-to-r from-primary to-secondary"
                    }`}
                    style={{ opacity: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
