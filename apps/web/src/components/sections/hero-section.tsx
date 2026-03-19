/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "motion/react";
import {
  IconClock,
  IconChecklist,
  IconChartLine,
  IconCoin,
} from "@tabler/icons-react";
import { TRUST_BADGES } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";

interface HeroSectionProps {
  className?: string;
}

const ANIMATIONS = {
  floatingIcon: (delay: number = 0) => ({
    y: [0, -10, 0],
    transition: {
      y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay },
    },
  }),
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  rotate: (duration: number = 40, direction: 1 | -1 = 1) => ({
    rotate: direction * 360,
    transition: { duration, repeat: Infinity, ease: "linear" },
  }),
};

const STATS_CARDS = [
  {
    icon: IconChartLine,
    label: "Revenue Increase",
    value: "32%",
    description: "Average boost for our clients",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.3,
  },
  {
    icon: IconClock,
    label: "Faster Payments",
    value: "48%",
    description: "Reduction in processing time",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.5,
  },
  {
    icon: IconChecklist,
    label: "Claim Accuracy",
    value: "98%",
    description: "First-pass acceptance rate",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.7,
  },
  {
    icon: IconCoin,
    label: "Cost Reduction",
    value: "25%",
    description: "Lower administrative costs",
    gradient: "from-orange-500 to-red-500",
    delay: 0.9,
  },
];

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden min-h-[calc(100vh-200px)] flex items-center",
        className,
      )}
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-bg.jpg"
          alt="Healthcare Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={70}
        />
        {/* RESTORED: Gradient overlay - this is crucial! */}
        <div className="absolute inset-0 bg-linear-to-r from-background/30 via-background/10 to-background/0 dark:from-background/95 dark:via-background/80 dark:to-background/60" />

        {/* Pattern overlay - now appears ON TOP of the gradient but BEHIND content */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
        </div>
      </div>

      <div className="section-wrapper">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 border border-primary/20 backdrop-blur-sm"
              >
                <motion.span
                  animate={ANIMATIONS.pulse as any}
                  className="relative flex h-2 w-2"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </motion.span>
                <span className="text-sm font-medium tracking-wide">
                  Trusted by 500+ Healthcare Providers
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
              >
                <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Your Revenue,
                </span>
                <br />
                <span className="text-foreground">Our Responsibility</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                AI-powered solutions that streamline your medical billing,
                reduce denials, and accelerate cash flow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0"
              >
                {TRUST_BADGES.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50",
                      gradientClass(item.gradient, { opacity: 5 }),
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-full text-white",
                        gradientClass(item.gradient, { opacity: 50 }),
                      )}
                    >
                      <item.icon />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Redesigned with larger stats cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Stats Cards Grid - Clean and prominent */}
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {STATS_CARDS.map((card, index) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: card.delay }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-background/80 backdrop-blur-xl rounded-2xl p-6 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <motion.div
                      animate={ANIMATIONS.floatingIcon(index * 0.2) as any}
                      className={`w-14 h-14 bg-linear-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <card.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {card.label}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {card.value}
                      </p>
                      <p className="text-xs text-muted-foreground/80">
                        {card.description}
                      </p>
                    </div>

                    {/* Subtle gradient line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${card.gradient} rounded-b-2xl opacity-50`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
