"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ASSOCIATIONS } from "@/lib/constants";
import { cn } from "@workspace/ui/lib/utils";

interface AssociationSectionProps {
  className?: string;
  grayscaleHover?: boolean;
}

export function AssociationSection({
  className,
  grayscaleHover = false,
}: AssociationSectionProps) {
  return (
    <section className={cn("section-wrapper py-20", className)}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            In Association With
          </h2>
          <p className="text-muted-foreground mt-2">
            Trusted collaborations that strengthen our impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {ASSOCIATIONS.map((item, index) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group"
            >
              <div className="bg-linear-to-br from-background/50 via-primary/5 to-accent/10 rounded-2xl border border-border/60 flex-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={200}
                  height={200}
                  className={cn(
                    "h-30 2xl:h-40 aspect-square w-auto object-cover transition duration-300",
                    grayscaleHover ? "grayscale group-hover:grayscale-0" : "",
                  )}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
