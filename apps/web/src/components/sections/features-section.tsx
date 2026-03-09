"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

import { FEATURES } from "@/lib/constants";
import { SectionHeader } from "@/components/layout/section-header";

export function FeaturesSection() {
  return (
    <section className="section-container">
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
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative p-8 rounded-2xl border bg-linear-to-br from-background to-muted/30"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-primary">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{feature.stats}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
