"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { Children, isValidElement, type ReactNode } from "react";

import { getDecorativeImage } from "@/lib/decorative-image";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  description?: string;
  center?: boolean;
  imageUrl?: string;
  className?: string;
  height?: string;
  actions?: ReactNode;
}

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node
      .map((child) => getNodeText(child))
      .join(" ")
      .trim();
  }

  if (isValidElement(node)) {
    return getNodeText((node.props as { children?: ReactNode }).children);
  }

  return "";
}

export function PageHeader({
  title,
  subtitle,
  actions,
  description,
  center = true,
  imageUrl,
  className = "",
  height = "h-96",
}: PageHeaderProps) {
  const titleText = getNodeText(Children.toArray(title));
  const resolvedImageUrl = getDecorativeImage(
    [titleText, typeof subtitle === "string" ? subtitle : "", description]
      .filter(Boolean)
      .join(" | "),
    "hero",
    imageUrl,
  );

  return (
    <div className={`relative section-wrapper ${height} ${className}`}>
      {/* Background image or fallback gradient */}

      <div
        className={cn(
          "absolute inset-0 -z-20",
          !imageUrl && "bg-linear-to-r from-primary/10 to-primary/5",
        )}
      >
        <Image
          src={resolvedImageUrl}
          alt={titleText ? `${titleText} header art` : "Page header art"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/70 to-black/50  " />
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
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {typeof subtitle === "string" ? (
                <div className="bg-primary/30 inline-flex items-center gap-2 text-primary px-4 py-2 rounded-full mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-sm font-medium">{subtitle}</span>
                </div>
              ) : (
                subtitle
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl max-w-3xl font-bold mb-6 text-primary-foreground"
          >
            {title}
          </motion.div>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/40 md:text-lg max-w-2xl mx-auto mb-6"
            >
              {description}
            </motion.p>
          )}

          {actions}
        </div>
      </div>
    </div>
  );
}
