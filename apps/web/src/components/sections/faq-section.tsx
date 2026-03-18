"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { cn } from "@workspace/ui/lib/utils";

import { FAQS } from "@/lib/constants";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";

interface FAQSectionProps {
  faqs?: {
    question: string;
    answer: string;
  }[];
  className?: string;
  limit?: number;
}

export function FAQSection({ faqs, limit = 6, className }: FAQSectionProps) {
  const hasCustomFaqs = Array.isArray(faqs) && faqs.length > 0;

  let displayFaqs = limit ? FAQS.slice(0, limit) : FAQS;
  if (faqs) displayFaqs = faqs;

  if (!faqs) faqs = FAQS;

  return (
    <section
      className={cn("section-wrapper relative overflow-hidden", className)}
    >
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="section-container relative">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            subtitle="FAQ"
            title="Frequently Asked Questions"
            description="Got questions? We've got answers"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full space-y-5">
              {displayFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className={cn(
                      "group rounded-xl border px-6",
                      "bg-linear-to-br from-background via-background to-muted/40",
                      "transition-all duration-300",
                      "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
                      "data-[state=open]:shadow-lg data-[state=open]:border-primary/40",
                    )}
                  >
                    <AccordionTrigger
                      className={cn(
                        "py-5 text-left hover:no-underline",
                        "transition-all",
                        "[&[data-state=open]>svg]:rotate-180",
                      )}
                    >
                      <span className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                        {faq.question}
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* View All */}
          {!hasCustomFaqs && limit && FAQS.length > limit && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button href="/services" size="lg" className="group">
                View All Faqs
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
