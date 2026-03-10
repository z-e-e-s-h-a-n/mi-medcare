// components/sections/ehr-section.tsx
"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { EHR_SYSTEMS } from "@/lib/constants";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

interface EHRSectionProps {
  limit?: number;
}

export function EHRSection({ limit }: EHRSectionProps) {
  const displayEHRs = limit ? EHR_SYSTEMS.slice(0, limit) : EHR_SYSTEMS;

  return (
    <section className="section-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          We work with these <span className="gradient-text">EHRs</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Our medical billing specialists know the workarounds of all the EHRs.
          We help you submit clean claims no matter which EHR you use.
        </p>
      </motion.div>

      {/* EHR Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayEHRs.map((ehr, index) => (
          <motion.div
            key={ehr.name}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{
              y: -4,
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            }}
            className="group relative flex items-center justify-center rounded-xl border border-primary/50 bg-white p-2 backdrop-blur-sm transition-all duration-300 sm:p-4"
          >
            <Tooltip>
              <TooltipTrigger className="relative h-24 w-full">
                <Image src={ehr.logo} alt={ehr.name} width={300} height={100} />
              </TooltipTrigger>
              <TooltipContent>{ehr.name}</TooltipContent>
            </Tooltip>
          </motion.div>
        ))}
      </div>

      {/* View More Button (only if limit is set) */}
      {limit && EHR_SYSTEMS.length > limit && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/emr-ehr-support">
              View All {EHR_SYSTEMS.length} EHR Systems
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      )}
    </section>
  );
}
