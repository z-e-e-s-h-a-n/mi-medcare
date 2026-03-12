"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { BILLING_PROCESS } from "@/lib/constants";
import { SectionHeader } from "@/components/layout/section-header";
import { ArrowRight, Sparkles } from "lucide-react";
import { KpiSection } from "./kpi-section";
import { gradientClass } from "@/lib/utils";
import { cn } from "@workspace/ui/lib/utils";

interface HowItWorksSectionProps {
  useConstantColors?: boolean;
  className?: string;
}

export function HowItWorksSection({
  useConstantColors = true,
  className,
}: HowItWorksSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative overflow-hidden py-16 md:py-24 bg-muted",
        className,
      )}
    >
      {/* Abstract Background Elements - Hidden on mobile for performance */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-primary/20 to-transparent hidden md:block" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-secondary/20 to-transparent hidden md:block" />

        {/* Floating orbs - Hidden on mobile */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl hidden md:block"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl hidden md:block"
        />
      </div>

      <div className="section-wrapper relative px-4 md:px-6">
        <div className="section-container">
          <SectionHeader
            badge="Simple Process"
            title="How We Transform Your Revenue Cycle"
            description="A seamless journey from assessment to accelerated payments, designed to maximize your practice's revenue potential."
          />

        {/* Stats Summary Cards - Now responsive */}
        <div className="mb-12 md:mb-20">
          <KpiSection useConstantColors={useConstantColors} />
        </div>

        {/* Main Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Animated Line - Hidden on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute left-1/2 top-0 w-0.5 bg-linear-to-b from-primary via-secondary to-primary/30 -translate-x-1/2"
              style={{ height: lineHeight }}
            >
              {/* Pulsing dots on the line */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -left-1.5 w-4 h-4 bg-primary rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, delay: 1, repeat: Infinity }}
                className="absolute -bottom-2 -left-1.5 w-4 h-4 bg-secondary rounded-full"
              />
            </motion.div>
          )}

          {/* Process Steps */}
          <div className="relative">
            {BILLING_PROCESS.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const iconBg = useConstantColors
                ? `${gradientClass(step.gradient)} text-white`
                : "bg-linear-to-br from-primary/10 to-secondary/10 text-primary";
              const cardGlow = useConstantColors
                ? `${gradientClass(step.gradient, { opacity: 10 })} opacity-0 group-hover:opacity-10`
                : "bg-linear-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100";

              // Mobile layout is always vertical
              if (isMobile) {
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    className="relative mb-8 last:mb-0"
                  >
                    {/* Mobile Timeline Indicator */}
                    <div className="flex items-start gap-4">
                      {/* Step Number Circle */}
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-full animate-pulse" />
                        <div className="relative w-10 h-10 bg-background rounded-full border-3 border-primary flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {index + 1}
                          </span>
                        </div>

                        {/* Connecting Line */}
                        {index < BILLING_PROCESS.length - 1 && (
                          <div className="absolute top-10 left-1/2 w-0.5 h-12 bg-linear-to-b from-primary to-secondary -translate-x-1/2" />
                        )}
                      </div>

                      {/* Content Card */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative group flex-1"
                      >
                        {/* Background glow on hover */}
                        <div
                          className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 ${cardGlow}`}
                        />

                        {/* Card */}
                        <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 hover:border-primary/30 transition-all duration-300">
                          {/* Step Number Badge */}
                          <div className="mb-3">
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                              Step {index + 1}
                            </span>
                          </div>

                          {/* Icon */}
                          <div
                            className={`inline-flex p-3 rounded-xl mb-3 ${iconBg}`}
                          >
                            <Icon className="size-6" />
                          </div>

                          {/* Content */}
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              }

              // Desktop layout with alternating sides
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className={`relative flex items-center mb-16 last:mb-0 ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-5/12 ${isEven ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative group"
                    >
                      {/* Background glow on hover */}
                      <div
                        className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 ${cardGlow}`}
                      />

                      {/* Card */}
                      <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                        {/* Step Number Badge */}
                        <div
                          className={`absolute top-4 ${isEven ? "left-4" : "right-4"}`}
                        >
                          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Step {index + 1}
                          </span>
                        </div>

                        {/* Icon with animation */}
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`inline-flex p-4 rounded-xl mb-4 ${iconBg} ${
                            isEven ? "ml-auto" : ""
                          }`}
                        >
                          <Icon className="size-8" />
                        </motion.div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>

                        {/* Decorative corner accent */}
                        <div
                          className={`absolute bottom-0 ${isEven ? "right-0" : "left-0"} w-12 h-12 border-b-2 ${isEven ? "border-r-2" : "border-l-2"} border-primary/20 rounded-br-2xl`}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Timeline Node */}
                  <div className="relative z-10 flex items-center justify-center w-2/12">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.15 + 0.3,
                      }}
                      className="relative"
                    >
                      {/* Outer ring */}
                      <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-full animate-pulse" />

                      {/* Inner circle */}
                      <div className="relative w-12 h-12 bg-background rounded-full border-4 border-primary flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>

                      {/* Floating arrow indicators */}
                      {index < BILLING_PROCESS.length - 1 && (
                        <motion.div
                          animate={{ y: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -bottom-8 left-1/2 -translate-x-1/2"
                        >
                          <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12 md:mt-20"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-linear-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-2xl sm:rounded-full px-6 py-4 sm:px-8 sm:py-4">
              <Sparkles className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium text-center sm:text-left">
                Ready to streamline your revenue cycle?
              </span>
              <motion.button
                whileHover={{ x: 5 }}
                className="text-primary hover:text-primary/80 transition-colors font-semibold text-sm sm:text-base"
              >
                Get Started Today →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
