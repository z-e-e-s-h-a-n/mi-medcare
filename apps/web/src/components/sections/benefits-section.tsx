"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { BENEFITS_OF_CHOOSING } from "@/lib/constants";
import {
  CheckCircle,
  Zap,
  FileCheck,
  DollarSign,
  Shield,
  BarChart,
  TrendingUp,
  HeadphonesIcon,
} from "lucide-react";

const benefitIcons = [
  Zap,
  FileCheck,
  DollarSign,
  Shield,
  BarChart,
  TrendingUp,
  HeadphonesIcon,
  CheckCircle,
];

export function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden py-24" ref={ref}>
      {/* Sophisticated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-secondary/5 via-transparent to-primary/5" />

        {/* Abstract Wave Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <pattern
            id="wave"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 50 Q 25 30, 50 50 T 100 50"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#wave)" />
        </svg>
      </div>

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
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
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
              className="flex items-center gap-6 p-6 bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl border"
            >
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
            {BENEFITS_OF_CHOOSING.keyBenefits.map((benefit, index) => {
              const Icon = benefitIcons[index];

              return (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  className="group relative"
                >
                  <div className="h-full bg-background/50 backdrop-blur-sm border rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
                    {/* Icon with animated background */}
                    <motion.div
                      className="relative mb-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="absolute inset-0 bg-primary/5 rounded-full blur-md group-hover:bg-primary/10 transition-all" />
                      <div className="relative w-10 h-10 bg-linear-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border border-primary/20">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </motion.div>

                    {/* Benefit text */}
                    <h3 className="font-semibold text-sm lg:text-base leading-tight">
                      {benefit}
                    </h3>

                    {/* Hover indicator dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"
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
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              Ready to transform your revenue cycle?
            </span>
            <motion.button
              whileHover={{ x: 5 }}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Schedule a consultation →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
