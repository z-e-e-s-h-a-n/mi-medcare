"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  center = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn("mb-12 space-y-3", center ? "text-center" : "", className)}
    >
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm font-medium">{subtitle}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-3xl lg:text-4xl font-bold"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-foreground/50 max-w-3xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
