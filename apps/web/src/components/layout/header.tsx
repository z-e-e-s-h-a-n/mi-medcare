/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@workspace/ui/components/navigation-menu";
import { Button } from "@workspace/ui/components/button";
import { MobileNav } from "./mobile-nav";
import { BOOKING_LINK, HEADER_NAVIGATION } from "@/lib/constants";
import { MegaMenu } from "./mega-menu";
import { FloatingCtas } from "@/components/layout/floating-ctas";
import { formatBusinessAddress } from "@/lib/utils";
import { Logo } from "./logo";
import ThemeSwitch from "@workspace/ui/components/theme-toggle";
import { ChevronDownIcon, Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/social-icons";
import { useBusinessProfile } from "@/hooks/business";

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
  const { data: business } = useBusinessProfile();

  // Use Motion's useScroll for better performance
  const { scrollY } = useScroll();

  const socialLinks = useMemo(
    () => [
      {
        href: business.facebook,
        Icon: FacebookIcon,
        label: "Facebook",
      },
      {
        href: business.twitter,
        Icon: XIcon,
        label: "X",
      },
      {
        href: business.instagram,
        Icon: InstagramIcon,
        label: "Instagram",
      },
      {
        href: business.linkedin,
        Icon: LinkedInIcon,
        label: "LinkedIn",
      },
    ],
    [
      business.facebook,
      business.instagram,
      business.linkedin,
      business.twitter,
    ],
  );

  // Memoize formatted address
  const headOfficeDisplay = useMemo(() => {
    const headOfficeAddress = business.addresses?.[0];
    return formatBusinessAddress(headOfficeAddress);
  }, [business.addresses]);

  // Optimized scroll handling with useMotionValueEvent
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 20;
    setIsScrolled(latest > threshold);
  });

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
                  href={`tel:${business.phones[0].value}`}
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
                  <span>{business.phones[0].label}</span>
                </Link>
              </motion.div>

              {/* Social Links - Optimized with useMemo */}
              <motion.div className="flex items-center gap-4">
                {socialLinks.map(({ Icon, href, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    transition={hoverVariants.gentle as any}
                  >
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit MI MedCare on ${label}`}
                      prefetch={false}
                    >
                      <Icon className="size-4 text-primary-foreground" />
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
              <NavigationMenuList className="gap-2">
                {HEADER_NAVIGATION.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children && (
                      <>
                        {item.href ? (
                          <NavigationMenuTrigger asChild>
                            <Link href={item.href} className="inline-flex">
                              <motion.span
                                whileHover={{ y: -1 }}
                                transition={hoverVariants.spring as any}
                                className="inline-block"
                              >
                                {item.title}
                              </motion.span>
                              <ChevronDownIcon
                                className="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
                                aria-hidden="true"
                              />
                            </Link>
                          </NavigationMenuTrigger>
                        ) : (
                          <NavigationMenuTrigger>
                            <motion.span
                              whileHover={{ y: -1 }}
                              transition={hoverVariants.spring as any}
                              className="inline-block"
                            >
                              {item.title}
                            </motion.span>
                            <ChevronDownIcon
                              className="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
                              aria-hidden="true"
                            />
                          </NavigationMenuTrigger>
                        )}
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
                <Button href="/contact" variant="outline">
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
                  size="lg"
                  className="rounded-xl"
                  pulseDelay={5000}
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Appointment
                </Button>
              </motion.div>
            </motion.div>

            {/* Mobile */}
            <MobileNav />
          </motion.div>
        </div>
      </header>

      <FloatingCtas />
    </>
  );
}
