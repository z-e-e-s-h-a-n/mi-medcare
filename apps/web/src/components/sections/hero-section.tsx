/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "motion/react";
import {
  IconTrendingUp,
  IconClock,
  IconShield,
  IconBrain,
  IconStethoscope,
  IconReportMedical,
  IconHeartbeat,
  IconCash,
  IconChecklist,
} from "@tabler/icons-react";
import { TRUST_BADGES } from "@/lib/constants";
import { gradientClass } from "@/lib/utils";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";

interface HeroSectionProps {
  className?: string;
}

const ANIMATIONS = {
  floatingIcon: (delay: number = 0) => ({
    y: [0, -15, 0],
    x: [0, 8, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
    },
  }),
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  rotate: (duration: number = 40, direction: 1 | -1 = 1) => ({
    rotate: direction * 360,
    transition: { duration, repeat: Infinity, ease: "linear" },
  }),
};

const FLOATING_ICONS = [
  {
    Icon: IconHeartbeat,
    color: "from-purple-500 to-purple-600",
    position: "left-10 top-10",
    delay: 0.4,
    animationDelay: 0,
  },
  {
    Icon: IconBrain,
    color: "from-blue-500 to-blue-600",
    position: "right-10 top-20",
    delay: 0.5,
    animationDelay: 0.5,
  },
  {
    Icon: IconCash,
    color: "from-green-500 to-green-600",
    position: "left-0 top-1/2 -translate-y-1/2",
    delay: 0.6,
    animationDelay: 1,
  },
  {
    Icon: IconReportMedical,
    color: "from-orange-500 to-orange-600",
    position: "right-0 top-1/2 -translate-y-1/2",
    delay: 0.7,
    animationDelay: 1.5,
  },
  {
    Icon: IconStethoscope,
    color: "from-pink-500 to-pink-600",
    position: "left-16 bottom-10",
    delay: 0.8,
    animationDelay: 2,
  },
  {
    Icon: IconShield,
    color: "from-teal-500 to-teal-600",
    position: "right-16 bottom-20",
    delay: 0.9,
    animationDelay: 2.5,
  },
];

const FLOATING_CARDS = [
  {
    Icon: IconTrendingUp,
    color: "from-primary to-secondary",
    label: "Efficiency",
    value: "+32%",
    textColor: "text-primary",
    position: "left-1/4 top-1/4",
    initialX: -30,
    animateX: 10,
    moveX: [10, 0, 10],
    moveY: [0, -12, 0],
    delay: 1.2,
    borderColor: "border-primary/20",
  },
  {
    Icon: IconClock,
    color: "from-secondary to-primary",
    label: "Time Saved",
    value: "-48%",
    textColor: "text-primary",
    position: "right-1/3 bottom-1/3",
    initialX: 30,
    animateX: -60,
    moveX: [-60, -54, -60],
    moveY: [-70, -40, -70],
    delay: 1.3,
    borderColor: "border-secondary/20",
  },
  {
    Icon: IconChecklist,
    color: "from-green-500 to-green-600",
    label: "Accuracy",
    value: "98%",
    textColor: "text-green-500",
    position: "left-2/3 top-2/3",
    initialY: 10,
    animateY: -80,
    moveX: [-40, -10, -40],
    moveY: [-10, 0, -10],
    delay: 1.4,
    borderColor: "border-green-500/20",
  },
];

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden min-h-[calc(100vh-200px)] flex items-center",
        className,
      )}
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-bg.jpg"
          alt="Healthcare Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-background/60 to-background/40" />
      </div>

      <div className="section-wrapper">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Simplified animation props */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 border border-primary/20"
              >
                <motion.span
                  animate={ANIMATIONS.pulse as any}
                  className="relative flex h-2 w-2"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </motion.span>
                <span className="text-sm font-medium tracking-wide">
                  Trusted by 500+ Healthcare Providers
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
              >
                <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Your Revenue,
                </span>
                <br />
                <span className="text-foreground">Our Responsibility</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                AI-powered solutions that streamline your medical billing,
                reduce denials, and accelerate cash flow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0"
              >
                {TRUST_BADGES.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
                  >
                    <div
                      className={`p-2 rounded-full ${gradientClass(item.gradient, { opacity: 50 })} text-white`}
                    >
                      <item.icon />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Optimized with memoized configurations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block h-150"
            >
              {/* Central Abstract Element */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
              >
                <motion.div
                  animate={ANIMATIONS.rotate(40) as any}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
                  <div className="absolute inset-8 border border-secondary/30 rounded-full" />
                  <div className="absolute inset-16 border border-primary/10 rounded-full" />
                </motion.div>
              </motion.div>

              {/* Floating Icons - Mapped from configuration */}
              {FLOATING_ICONS.map(
                ({ Icon, color, position, delay, animationDelay }) => (
                  <motion.div
                    key={position}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: position.includes("left") ? -50 : 50,
                      y: position.includes("top")
                        ? -50
                        : position.includes("bottom")
                          ? 50
                          : 0,
                    }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={`absolute ${position}`}
                  >
                    <motion.div
                      animate={ANIMATIONS.floatingIcon(animationDelay) as any}
                      className={`bg-linear-to-br ${color} p-5 rounded-2xl shadow-xl will-change-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                ),
              )}

              {/* Small floating dots - Optimized with keyframe sharing */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
                >
                  <motion.div
                    animate={ANIMATIONS.floatingIcon(i * 0.3) as any}
                    className="absolute w-2 h-2 rounded-full will-change-transform"
                    style={{
                      background:
                        i % 2 === 0
                          ? "oklch(from var(--primary) l c h)"
                          : "oklch(from var(--secondary) l c h)",
                      top: `${20 + i * 10}%`,
                      left: `${30 + i * 8}%`,
                      opacity: 0.6,
                    }}
                  />
                </motion.div>
              ))}

              {/* Floating cards - Mapped from configuration */}
              {FLOATING_CARDS.map(
                ({
                  Icon,
                  color,
                  label,
                  value,
                  textColor,
                  position,
                  initialX,
                  animateX,
                  initialY,
                  animateY,
                  moveX,
                  moveY,
                  delay,
                  borderColor,
                }) => (
                  <motion.div
                    key={label}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: initialX ?? 0,
                      y: initialY ?? 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: animateX ?? 0,
                      y: animateY ?? 0,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay, type: "spring" }}
                    className={`absolute ${position}`}
                  >
                    <motion.div
                      animate={{
                        y: moveY,
                        x: moveX,
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: delay * 0.5,
                      }}
                      className={`bg-background/80 backdrop-blur-lg p-3 rounded-xl shadow-xl border ${borderColor} will-change-transform`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 bg-linear-to-br ${color} rounded-lg flex items-center justify-center`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {label}
                          </p>
                          <p className={`text-sm font-bold ${textColor}`}>
                            {value}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
