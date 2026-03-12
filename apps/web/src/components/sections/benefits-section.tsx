"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { BENEFITS_OF_CHOOSING } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { CheckCircle, TrendingUp } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface BenefitsSectionProps {
  useConstantColors?: boolean;
  className?: string;
}

export function BenefitsSection({
  useConstantColors = true,
  className,
}: BenefitsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const accent = BENEFITS_OF_CHOOSING.keyBenefits[0]?.gradient;

  return (
    <section
      className={cn("relative overflow-hidden py-24", className)}
      ref={ref}
    >
      <div className="section-wrapper">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-primary/1 0 text-primary`}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Why Choose Us</span>
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {BENEFITS_OF_CHOOSING.title.split("Medical Billing Services")[0]}
              <span className="gradient-text"> Medical Billing Services</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {BENEFITS_OF_CHOOSING.description}
            </p>

            {/* Stats Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="relative flex items-center gap-6 p-6 rounded-2xl border overflow-hidden"
            >
              <div
                className={`absolute inset-0 -z-10 bg-linear-to-r from-primary/5 to-secondary/5`}
              />
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-white font-bold text-sm"
                  >
                    {i === 1 ? "5" : i === 2 ? "0" : i === 3 ? "0" : "+"}
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">
                  Happy Healthcare Clients
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {BENEFITS_OF_CHOOSING.keyBenefits.map((benefit) => {
              const Icon = benefit.icon;
              const benefitAccent = benefit.gradient;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  className="group relative"
                >
                  <div
                    className={`h-full bg-background/50 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 ${
                      useConstantColors
                        ? "hover:border-border/80"
                        : "hover:border-primary/30"
                    }`}
                  >
                    {/* Icon with animated background */}
                    <motion.div className="relative mb-3">
                      <div
                        className={`absolute inset-0 rounded-full blur-md transition-all ${
                          useConstantColors
                            ? `${gradientClass(benefitAccent, { direction: "br" })} opacity-10 group-hover:opacity-20`
                            : "bg-primary/5 group-hover:bg-primary/10"
                        }`}
                      />
                      <div
                        className={`relative w-10 h-10 rounded-lg flex items-center justify-center border ${
                          useConstantColors
                            ? `${gradientClass(benefitAccent, { direction: "br" })} border-white/15`
                            : "bg-linear-to-br from-primary/10 to-secondary/10 border-primary/20"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            useConstantColors ? "text-white" : "text-primary"
                          }`}
                        />
                      </div>
                    </motion.div>

                    {/* Benefit text */}
                    <h3 className="font-semibold text-sm lg:text-base leading-tight">
                      {benefit.title}
                    </h3>

                    {/* Hover indicator dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                        useConstantColors
                          ? gradientClass(benefitAccent)
                          : "bg-primary"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-background/50 backdrop-blur-sm border rounded-full px-6 py-3">
              <CheckCircle
                className={`w-5 h-5 ${
                  useConstantColors ? "text-foreground" : "text-primary"
                }`}
              />
              <span className="text-sm font-medium">
                Ready to transform your revenue cycle?
              </span>
              <motion.button
                whileHover={{ x: 5 }}
                className={`transition-colors ${
                  useConstantColors
                    ? `${gradientClass(accent, { type: "text" })} opacity-90 hover:opacity-70`
                    : "text-primary hover:text-primary/80"
                }`}
              >
                Schedule a consultation →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
