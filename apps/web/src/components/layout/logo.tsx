"use client";
import { useTheme } from "@workspace/ui/hooks/use-theme";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    if (theme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentTheme(theme);
    }
  }, [theme]);

  const logoPath = `/images/logo-${currentTheme}.png`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link href="/">
        <Image src={logoPath} alt="Logo" width={200} height={60} priority />
      </Link>
    </motion.div>
  );
}
