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
  useConstantColors = true,
  className,
}: SuccessMetricsProps) {
  return (
    <section className={cn("relative overflow-hidden py-24", className)}>
      <div className="section-wrapper">
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
              const isRevenueImprovement =
                metric.label === "Revenue Improvement";
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
                  <div
                    className={cn(
                      "relative h-full bg-linear-to-br from-primary/10 to-accent/10 backdrop-blur-sm border rounded-2xl p-6 overflow-hidden transition-colors duration-300 group ",
                      !useConstantColors &&
                        "hover:from-primary hover:via-primary/80 hover:to-primary/60 hover:text-primary-foreground",
                    )}
                  >
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
                          className={cn(
                            "size-5 transition-colors",
                            useConstantColors
                              ? "text-white"
                              : "text-primary group-hover:text-primary-foreground",
                          )}
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
                        <div className="text-3xl lg:text-4xl font-bold transition-colors group-hover:text-primary-foreground">
                          {metric.prefix}
                          <CountUp
                            end={metric.value}
                            duration={2.5}
                            separator=","
                            suffix={metric.suffix}
                          />
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80">
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
      </div>
    </section>
  );
}
