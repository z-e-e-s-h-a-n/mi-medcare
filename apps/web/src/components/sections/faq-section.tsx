// components/faq-section.tsx
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

interface FAQSectionProps {
  faqs?: {
    question: string;
    answer: string;
  }[];
  className?: string;
}

export function FAQSection({ faqs, className }: FAQSectionProps) {
  if (!faqs) faqs = FAQS;

  return (
    <section className={cn("section-wrapper", className)}>
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Got questions? We've got answers"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border rounded-xl px-6 bg-background data-[state=open]:shadow-lg transition-all"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="text-base font-semibold">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
