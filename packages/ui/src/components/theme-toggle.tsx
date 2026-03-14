"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button, type ButtonProps } from "@workspace/ui/components/button";
import { useTheme } from "../hooks/use-theme";

function ThemeSwitch(props: ButtonProps) {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);
  const isDark = theme === "dark";

  // Moon paths and sparkles
  const moonPaths = {
    main: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
    sparkles: "M9 9l1 1m4-4l1 1M9 15l1 1m4-4l1 1",
  };

  // Sun paths and rays
  const sunPaths = [
    "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    "M12 8v2m0 4v2m4-4h-2m-4 0H8",
  ];

  return (
    <motion.div
      className="relative"
      animate={{
        rotate: isHovered ? [0, -10, 10, -5, 0] : [0, 2, -2, 0], // subtle shake always
      }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        size="icon"
        {...props}
        onClick={toggleTheme}
        className="relative overflow-hidden rounded-full w-9 h-9"
      >
        {/* Background hover effect */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            scale: isHovered ? 1.2 : 1,
            backgroundColor: isHovered
              ? isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)"
              : "transparent",
          }}
          transition={{ duration: 0.2 }}
        />

        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            // Moon icon (already perfect)
            <motion.svg
              key="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="size-4 2xl:size-5"
            >
              <motion.path
                d={moonPaths.main}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d={moonPaths.sparkles}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.svg>
          ) : (
            // Sun icon with soft always-on animation
            <motion.svg
              key="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="size-4 2xl:size-5"
            >
              {/* Soft pulsing sun core */}
              <motion.circle
                cx="12"
                cy="12"
                r="4"
                animate={{ r: [4, 4.3, 4] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Gentle rotating rays */}
              {sunPaths.map((path, index) => (
                <motion.path
                  key={index}
                  d={path}
                  animate={{
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1, rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}

export default ThemeSwitch;
