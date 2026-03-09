"use client";

import { motion } from "motion/react";
import { BILLING_PROCESS } from "@/lib/constants";
import { SectionHeader } from "@/components/layout/section-header";

export function HowItWorksSection() {
  return (
    <section className="section-container py-20">
      <SectionHeader
        badge="Our Process"
        title="How Our Medical Billing Process Works"
        description="Our medical billing company simplifies every step of the billing cycle to help practices get paid faster, with fewer denials."
      />

      <div className="relative mt-16">
        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {BILLING_PROCESS.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative"
              >
                {/* Card with hover effect */}
                <motion.div
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  className="relative bg-background/50 backdrop-blur-sm border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 h-full flex flex-col"
                >
                  {/* Step Number with animated background */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-300" />
                      <div className="relative w-14 h-14 bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                    </motion.div>

                    {/* Step indicator */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Step {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed grow">
                    {step.description}
                  </p>

                  {/* Hover indicator line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-secondary rounded-b-2xl transition-all duration-300 group-hover:w-full" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
