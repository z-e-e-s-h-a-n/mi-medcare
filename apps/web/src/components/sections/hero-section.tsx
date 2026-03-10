"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IconTrendingUp, IconClock } from "@tabler/icons-react";
import { TRUST_BADGES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-200px)] flex items-center">
      {/* Background Image with Sophisticated Overlay */}
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

      {/* Animated Background Elements - More Subtle */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs - Softer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 left-10 size-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-20 right-10 w-125 h-125 bg-secondary/10 rounded-full blur-3xl"
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.01]" />
      </div>

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Enhanced Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Trust Badge - More Elegant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-primary/5 text-primary px-4 py-2 rounded-full mb-8 border border-primary/10"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative flex h-2 w-2"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </motion.span>
              <span className="text-sm font-medium tracking-wide">
                Trusted by 500+ Healthcare Providers
              </span>
            </motion.div>

            {/* Main Heading - More Refined */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              <span className="gradient-text bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Your Revenue,
              </span>
              <br />
              <span className="text-foreground">Management</span>
            </motion.h1>

            {/* Subtitle - Added for better context */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              AI-powered solutions that streamline your medical billing, reduce
              denials, and accelerate cash flow.
            </motion.p>

            {/* Trust Indicators - Enhanced with icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0"
            >
              {TRUST_BADGES.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
                >
                  <div className={`p-2 rounded-full bg-${item.color}/10`}>
                    <item.icon className={`h-4 w-4 text-${item.color}`} />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Visual - Abstract Data Visualization */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <div className="relative w-full h-125">
                {/* Abstract RCM Visualization */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-80 h-80 border-2 border-primary/20 rounded-full" />
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-60 h-60 border-2 border-secondary/20 rounded-full" />
                </motion.div>

                {/* Central Icon */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="w-32 h-32 bg-linear-to-br from-primary to-secondary rounded-2xl shadow-2xl flex items-center justify-center">
                    <IconTrendingUp className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Stats Cards - More Professional */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-6 top-20 bg-background/90 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-border/50"
            >
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <IconTrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Clean Claim Rate
                  </p>
                  <p className="text-2xl font-bold text-green-500">98%</p>
                  <p className="text-xs text-green-500">↑ 12% this month</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -right-6 bottom-20 bg-background/90 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-border/50"
            >
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, delay: 1, repeat: Infinity }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <IconClock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Claims Processed
                  </p>
                  <p className="text-2xl font-bold text-blue-500">5M+</p>
                  <p className="text-xs text-blue-500">Annual volume</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Elements - More Refined */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-150 border border-primary/5 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-125 border border-secondary/5 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
