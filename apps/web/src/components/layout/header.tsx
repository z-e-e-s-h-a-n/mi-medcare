/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
} from "@tabler/icons-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@workspace/ui/components/navigation-menu";
import { Button } from "@workspace/ui/components/button";
import { MobileNav } from "./mobile-nav";
import { business, HEADER_NAVIGATION } from "@/lib/constants";
import { MegaMenu } from "./mega-menu";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { FloatingCtas } from "@/components/layout/floating-ctas";
import { formatBusinessAddress } from "@/lib/utils";
import { Logo } from "./logo";
import ThemeSwitch from "@workspace/ui/components/theme-toggle";
import { Mail, MapPin, Phone } from "lucide-react";

// Memoized social links configuration
const SOCIAL_LINKS = [
  { href: business.facebook, Icon: IconBrandFacebook, name: "Facebook" },
  { href: business.instagram, Icon: IconBrandInstagram, name: "Instagram" },
  { href: business.linkedin, Icon: IconBrandLinkedin, name: "LinkedIn" },
  { href: business.tiktok, Icon: IconBrandTiktok, name: "TikTok" },
] as const;

// Animation variants for better performance
const hoverVariants = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 17,
  },
  gentle: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  },
};

const iconHoverVariants = {
  hover: { rotate: [0, -10, 10, -5, 0] },
  tap: { scale: 0.95 },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Use Motion's useScroll for better performance
  const { scrollY } = useScroll();

  // Memoize formatted address
  const headOfficeDisplay = useMemo(() => {
    const headOfficeAddress = business.addresses?.[0];
    return formatBusinessAddress(headOfficeAddress);
  }, []);

  // Optimized scroll handling with useMotionValueEvent
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 20;
    setIsScrolled(latest > threshold);
  });

  // Memoize callbacks
  const handleConsultationOpen = useCallback(() => {
    setIsConsultationOpen(true);
  }, []);

  const handleConsultationClose = useCallback(() => {
    setIsConsultationOpen(false);
  }, []);

  return (
    <>
      {/* Top Bar - Optimized animations */}
      <motion.div
        initial={{ height: 40, opacity: 1 }}
        animate={{
          height: isScrolled ? 24 : 40,
          opacity: isScrolled ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "linear" }}
        className="section-wrapper hidden lg:flex items-center bg-primary text-primary-foreground overflow-hidden will-change-[height,opacity]"
      >
        <div className="section-container">
          <div className="flex items-center justify-between gap-6 bg-primary text-primary-foreground text-sm py-2.5">
            <div className="flex-1 min-w-0 flex items-center gap-6">
              {/* Address - Optimized hover */}
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ x: 2 }}
                transition={hoverVariants.spring as any}
              >
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={iconHoverVariants}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin />
                </motion.div>
                <span className="truncate">{headOfficeDisplay}</span>
              </motion.div>

              {/* Email - Optimized */}
              <motion.div
                whileHover={{ x: 2 }}
                transition={hoverVariants.spring as any}
              >
                <Link
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={iconHoverVariants}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail />
                  </motion.div>
                  <span>{business.email}</span>
                </Link>
              </motion.div>
            </div>

            <div className="flex items-center gap-6">
              {/* Phone - Optimized */}
              <motion.div
                whileHover={{ x: 2 }}
                transition={hoverVariants.spring as any}
              >
                <Link
                  href={`tel:${business.phone}`}
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={iconHoverVariants}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone />
                  </motion.div>
                  <span>{business.phone}</span>
                </Link>
              </motion.div>

              {/* Social Links - Optimized with useMemo */}
              <motion.div className="flex items-center gap-2">
                {SOCIAL_LINKS.map(({ Icon, href, name }) => (
                  <motion.div
                    key={name}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    transition={hoverVariants.gentle as any}
                  >
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit MI MedCare on ${name}`}
                      prefetch={false}
                    >
                      <Icon />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="w-px h-4 bg-primary-foreground/20" />

              <ThemeSwitch />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header - Optimized */}
      <header className="section-wrapper sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg shadow-sm">
        <div className="section-container">
          <motion.div
            initial={{ paddingTop: 16, paddingBottom: 16 }}
            animate={{
              paddingTop: isScrolled ? 12 : 16,
              paddingBottom: isScrolled ? 12 : 16,
            }}
            transition={{ duration: 0.2, ease: "linear" }}
            className="flex items-center justify-between gap-6 will-change-[padding]"
          >
            <Logo />

            {/* Desktop Navigation - Optimized */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {HEADER_NAVIGATION.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children && (
                      <>
                        <NavigationMenuTrigger>
                          <motion.span
                            whileHover={{ y: -1 }}
                            transition={hoverVariants.spring as any}
                            className="inline-block"
                          >
                            {item.title}
                          </motion.span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <MegaMenu item={item} />
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Buttons - Optimized */}
            <motion.div className="hidden lg:flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={hoverVariants.spring as any}
              >
                <Button
                  href="/contact"
                  variant="outline"
                  className="rounded-2xl"
                >
                  Contact
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={hoverVariants.spring as any}
              >
                <Button
                  variant="gradient"
                  className="rounded-2xl"
                  pulseDelay={5000}
                  onClick={handleConsultationOpen}
                >
                  Book Consultation
                </Button>
              </motion.div>
            </motion.div>

            {/* Mobile */}
            <MobileNav onBookConsultation={handleConsultationOpen} />
          </motion.div>
        </div>
      </header>

      <FloatingCtas onBookConsultation={handleConsultationOpen} />

      <ConsultationForm
        open={isConsultationOpen}
        onOpenChange={handleConsultationClose}
      />
    </>
  );
}
