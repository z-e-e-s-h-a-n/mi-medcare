"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { business } from "@/lib/constants";
import { NewsletterCtaForm } from "@/components/forms/newsletter-form";

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with Parallax - FIXED: Better gradient for mobile */}
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 -z-10"
      >
        {/* FIXED: Adjusted gradient to be softer and more subtle on mobile */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/90 via-primary/80 to-secondary/80 md:bg-linear-to-r md:from-primary md:via-primary/80 md:to-secondary" />

        {/* Pattern overlay - kept the same */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 opacity-5 md:opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath d='M0 32h64M0 0h64M0 64h64' stroke='%23ffffff' stroke-opacity='0.35' stroke-width='1'/%3E%3Cpath d='M32 0v64M0 0v64M64 0v64' stroke='%23ffffff' stroke-opacity='0.35' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='2' fill='%23ffffff' fill-opacity='0.45'/%3E%3C/svg%3E\")",
            backgroundSize: "64px 64px",
          }}
        />
      </motion.div>

      {/* FIXED: Added overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-black/20 md:hidden -z-10" />

      <div className="section-wrapper relative py-16 lg:py-20">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="text-white">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium backdrop-blur-sm"
              >
                <ShieldCheck className="h-4 w-4" />
                Revenue cycle partners you can trust
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-5 text-3xl lg:text-5xl font-bold leading-tight"
              >
                Ready to transform your revenue cycle?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-5 text-white/90 md:text-white/85 text-lg"
              >
                Join 500+ healthcare providers who&apos;ve optimized
                collections, reduced denials, and gained predictable cash flow
                with MIMedCare. Get a free consultation and a tailored roadmap
                for your practice.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-6 grid gap-3 text-sm text-white/90 md:text-white/85"
              >
                {[
                  "Dedicated account specialists for every specialty",
                  "Transparent KPIs with monthly performance reviews",
                  "HIPAA-ready workflows and secure reporting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-white shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="group text-base px-8 w-full sm:w-auto"
                  href="/contact"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10 text-base px-8 w-full sm:w-auto"
                  href={`tel:${business.contact.phones?.[0]?.tel ?? business.contact.phones[0].tel}`}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/80"
              >
                <Link
                  href={`mailto:${business.contact.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{business.contact.email}</span>
                </Link>
                <span className="hidden sm:inline text-white/40">•</span>
                <Link
                  href={`tel:${business.contact.phones?.[0]?.tel ?? business.contact.phones[0].tel}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{business.contact.phones?.[0]?.display ?? business.contact.phones[0].display}</span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-background/95 p-6 shadow-2xl backdrop-blur lg:p-8"
            >
              <NewsletterCtaForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

