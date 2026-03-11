"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Home,
  Phone,
  HeartPulse,
  Activity,
  Stethoscope,
  Clock,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useRef } from "react";

export function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 300 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950"
    >
      {/* Animated Medical Pattern Background */}
      <div className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <pattern
            id="medical-grid"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="25"
              cy="25"
              r="4"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-primary"
            />
            <path
              d="M25 10 L25 40 M10 25 L40 25"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary"
            />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#medical-grid)"
          />
        </svg>
      </div>

      {/* Floating Medical Icons - Parallax Effect */}
      <motion.div
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], [-50, 50]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [-50, 50]),
        }}
        className="absolute top-20 left-[15%] text-primary/10"
      >
        <HeartPulse className="w-24 h-24" />
      </motion.div>

      <motion.div
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], [50, -50]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [30, -30]),
        }}
        className="absolute bottom-20 right-[15%] text-secondary/10"
      >
        <Activity className="w-32 h-32" />
      </motion.div>

      <motion.div
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [40, -40]),
        }}
        className="absolute top-40 right-[20%] text-primary/5"
      >
        <Stethoscope className="w-20 h-20" />
      </motion.div>

      <motion.div
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], [40, -40]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]),
        }}
        className="absolute bottom-40 left-[20%] text-secondary/5"
      >
        <Clock className="w-20 h-20" />
      </motion.div>

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
      />

      {/* Main Content Container */}
      <div className="section-container relative px-4 py-16 z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative mb-12"
            style={{
              rotateX: useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]),
              rotateY: useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]),
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl"
            />
            <h1 className="text-8xl md:text-9xl font-black">
              <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                404
              </span>
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-2 mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="gradient-text">Page Not Found</span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base text-muted-foreground max-w-md mx-auto"
            >
              The page you&apos;re looking for seems to have checked out.
              Let&apos;s get you back on track.
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              href="/"
              size="lg"
              variant="gradient"
              className="group relative overflow-hidden min-w-50"
            >
              <Home className="mr-2 group-hover:scale-110 transition-transform" />
              Back to Home
            </Button>

            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="group relative overflow-hidden min-w-50 border-2 hover:bg-muted"
            >
              <Phone className="mr- group-hover:rotate-12 transition-transform" />
              Contact Support
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent origin-left"
      />
    </div>
  );
}
