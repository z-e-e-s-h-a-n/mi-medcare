/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@workspace/ui/components/button";
import { SectionHeader } from "@/components/layout/section-header";
import { SERVICES } from "@/lib/constants";
import { cn } from "@workspace/ui/lib/utils";
import { gradientClass } from "@/lib/utils";

interface ServicesSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  limit?: number;
  services?: any[];
  className?: string;
  useConstantColors?: boolean;
}

export function ServicesSection({
  title = "Our Services",
  badge = "Comprehensive RCM Solutions",
  description = "End-to-end revenue cycle management services tailored to your practice's needs",
  limit,
  useConstantColors = false,
  className,
  services,
}: ServicesSectionProps) {
  let displayServices = limit ? SERVICES.slice(0, limit) : SERVICES;
  if (services) displayServices = services;

  return (
    <section className={cn("section-wrapper", className)}>
      <div className="section-container">
        <SectionHeader
          subtitle={badge}
          title={title}
          description={description}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border bg-background shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image stage */}
                <div className="relative h-56 sm:h-64 md:h-auto md:aspect-4/3">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={`${service.title} photo`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      quality={65}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-muted to-background" />
                  )}

                  {/* Vignette + readability */}
                  <div className="absolute inset-0 bg-black/15" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

                  {/* Mobile: plain title (no wrapper/bg) */}
                  <div className="absolute left-4 right-4 top-4 md:hidden flex items-start justify-between gap-3">
                    <h3 className="min-w-0 text-lg font-semibold text-white leading-snug line-clamp-2">
                      {service.title}
                    </h3>
                    <Link
                      href={service.href}
                      className="shrink-0 inline-flex items-center gap-2 text-xs font-medium text-white/90 hover:text-white transition-colors"
                    >
                      <span>Learn More</span>
                      <span className="sr-only"> about {service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Mobile: separator above bottom icon */}
                  <div className="absolute left-4 bottom-24 md:hidden w-14 border-t border-white/30" />

                  {/* Icon badge (always visible) */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={cn(
                      "absolute left-4 bottom-4 md:bottom-auto md:top-4 w-14 h-14 md:w-12 md:h-12 rounded-xl p-3 backdrop-blur-md border border-white/20 shadow-lg",
                      useConstantColors
                        ? `text-white ${gradientClass(service.gradient)}`
                        : "bg-primary text-primary-foreground",
                    )}
                  >
                    <Icon className="size-full" />
                  </motion.div>

                  {/* Stats pill */}
                  <span
                    className={cn(
                      "hidden md:inline-flex absolute right-4 top-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-white/20",
                      useConstantColors
                        ? `text-white ${gradientClass(service.gradient)}`
                        : "bg-primary/60 text-primary-foreground",
                    )}
                  >
                    {service.stats}
                  </span>

                  {/* Always-visible caption (lets you still SEE the image) */}
                  <div className="hidden md:block absolute left-4 right-4 bottom-4">
                    <h3
                      className={cn(
                        "text-base sm:text-lg font-semibold line-clamp-1",
                        useConstantColors ? "text-white/80" : "text-foreground",
                      )}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Hover/focus reveal panel */}
                  <div
                    className={cn(
                      "hidden md:block",
                      "absolute inset-x-4 bottom-4 rounded-2xl bg-background/80 backdrop-blur-md border border-border/60 p-4 shadow-xl",
                      "opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0",
                      "transition-all duration-300",
                      useConstantColors
                        ? gradientClass(service.gradient, { opacity: 10 })
                        : "",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="text-base font-semibold line-clamp-1">
                          {service.title}
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={service.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                    >
                      <span>Learn More</span>
                      <span className="sr-only"> about {service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All */}
        {limit && SERVICES.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button href="/services" size="lg" className="group">
              View All Services
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
