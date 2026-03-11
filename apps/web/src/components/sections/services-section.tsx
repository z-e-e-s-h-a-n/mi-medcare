"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { SectionHeader } from "@/components/layout/section-header";
import { SERVICES } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { cn } from "@workspace/ui/lib/utils";

interface ServicesSectionProps {
  limit?: number;
  useConstantColors?: boolean;
  className?: string;
}

export function ServicesSection({
  limit,
  useConstantColors = false,
  className,
}: ServicesSectionProps) {
  const displayServices = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section className={cn("section-container bg-muted", className)}>
      <SectionHeader
        badge="Our Services"
        title="Comprehensive RCM Solutions"
        description="End-to-end revenue cycle management services tailored to your practice's needs"
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
              className="group relative bg-background rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 ${gradientClass(service.gradient, { direction: "br" })} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />

              {/* Icon with Animation */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-14 h-14 rounded-xl ${gradientClass(service.gradient, { direction: "br" })} p-3 mb-4 text-white`}
              >
                <Icon className="size-full" />
              </motion.div>

              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>

              {/* Stats Badge */}

              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm mb-4 absolute top-4 right-4",
                  useConstantColors
                    ? `${gradientClass(service.gradient, { opacity: 50 })} text-white`
                    : "bg-primary/10 text-primary",
                )}
              >
                {service.stats}
              </span>

              <Link
                href={service.href}
                className="flex items-center gap-2 font-medium group-hover:gap-3 transition-all text-primary"
              >
                <span>Learn More</span>
                <ArrowRight />
              </Link>
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
    </section>
  );
}
