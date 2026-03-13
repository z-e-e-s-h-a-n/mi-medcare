"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  center?: boolean;
  imageUrl?: string;
  className?: string;
  height?: string;
}

export function PageHeader({
  title,
  subtitle,
  description,
  badge,
  center = true,
  imageUrl = "/images/page-header.webp",
  className = "",
  height = "h-96",
}: PageHeaderProps) {
  return (
    <div className={`relative section-wrapper ${height} ${className}`}>
      {/* Background image or fallback gradient */}

      <div className="absolute inset-0 -z-20">
        <Image
          src={imageUrl}
          alt="Page Header BG"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/50 to-black/40" />
      </div>

      {/* Medical dotted pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] -z-10"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div
        className={`section-container h-full flex items-center ${
          center ? "justify-center text-center" : "justify-start text-left"
        }`}
      >
        <div className="relative z-10 px-6 max-w-5xl mx-auto">
          {badge && (
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
              <span className="text-sm font-medium">{badge}</span>
            </motion.div>
          )}

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-primary font-semibold mb-2"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl max-w-3xl font-bold mb-4 text-primary-foreground"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:text-lg text-muted/50 max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
