"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { BENEFITS_OF_CHOOSING } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { CheckCircle, TrendingUp } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";

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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-primary/10 text-primary"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Why Choose Us</span>
              </motion.div>

              {/* Title */}
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                {
                  BENEFITS_OF_CHOOSING.title.split(
                    "Medical Billing Services",
                  )[0]
                }
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
              className="relative overflow-hidden rounded-3xl border bg-background/30 min-h-130 lg:min-h-150"
            >
              {/* Image backdrop */}
              <div className="absolute inset-0">
                <Image
                  src="/images/technology.jpg"
                  alt="Healthcare revenue cycle operations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/60 to-background/25" />
              </div>

              {/* Content */}
              <div className="relative p-6 h-full flex flex-col justify-between">
                {/* Top content */}
                <div>
                  {/* Small header pill */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 backdrop-blur-md">
                      <span className="text-sm font-semibold">
                        Trusted Outcomes
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Built for U.S. practices
                      </span>
                    </div>
                  </div>

                  {/* Top 2 cards */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {BENEFITS_OF_CHOOSING.keyBenefits
                      .slice(0, 2)
                      .map((benefit) => {
                        const Icon = benefit.icon;
                        const benefitAccent = benefit.gradient;

                        return (
                          <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            whileHover={{
                              y: -4,
                              transition: { duration: 0.2 },
                            }}
                            className="group relative"
                          >
                            <div
                              className={cn(
                                "h-full rounded-2xl border p-5 backdrop-blur-md transition-all duration-300",
                                "bg-background/70 border-border/60 hover:shadow-xl",
                                useConstantColors
                                  ? "hover:border-border/80"
                                  : "hover:border-primary/30",
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={cn(
                                    "shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm",
                                    useConstantColors
                                      ? `${gradientClass(benefitAccent, { direction: "br" })} border-white/15`
                                      : "bg-primary/10 border-primary/15 text-primary",
                                  )}
                                >
                                  <Icon
                                    className={cn(
                                      "w-5 h-5",
                                      useConstantColors
                                        ? "text-white"
                                        : "text-primary",
                                    )}
                                  />
                                </div>

                                <div className="min-w-0">
                                  <h3 className="font-semibold text-sm sm:text-base leading-tight">
                                    {benefit.title}
                                  </h3>
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    Measurable improvements you can see month
                                    over month.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}

                    {/* Middle card spanning full width */}
                    {BENEFITS_OF_CHOOSING.keyBenefits
                      .slice(2, 3)
                      .map((benefit) => {
                        const Icon = benefit.icon;
                        const benefitAccent = benefit.gradient;

                        return (
                          <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            whileHover={{
                              y: -4,
                              transition: { duration: 0.2 },
                            }}
                            className="group relative sm:col-span-2"
                          >
                            <div
                              className={cn(
                                "h-full rounded-2xl border p-5 backdrop-blur-md transition-all duration-300",
                                "bg-background/70 border-border/60 hover:shadow-xl",
                                useConstantColors
                                  ? "hover:border-border/80"
                                  : "hover:border-primary/30",
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={cn(
                                    "shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm",
                                    useConstantColors
                                      ? `${gradientClass(benefitAccent, { direction: "br" })} border-white/15`
                                      : "bg-primary/10 border-primary/15 text-primary",
                                  )}
                                >
                                  <Icon
                                    className={cn(
                                      "w-5 h-5",
                                      useConstantColors
                                        ? "text-white"
                                        : "text-primary",
                                    )}
                                  />
                                </div>

                                <div className="min-w-0">
                                  <h3 className="font-semibold text-sm sm:text-base leading-tight">
                                    {benefit.title}
                                  </h3>
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    Measurable improvements you can see month
                                    over month.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>

                {/* Bottom card */}
                <div className="mt-6">
                  <div className="rounded-2xl border border-border/60 bg-background/60 backdrop-blur-md px-5 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-sm font-medium">
                        Faster collections. Fewer denials. Cleaner reporting.
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Ask for a free RCM audit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
