"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  IconMapPin,
  IconMail,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconPhone,
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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const scrollThreshold = 80;
  const lastScrolledRef = useRef(false);
  const headOfficeAddress = business.addresses?.[0];
  const headOfficeDisplay = headOfficeAddress
    ? `${headOfficeAddress.label ? `${headOfficeAddress.label}: ` : ""}${formatBusinessAddress(
        headOfficeAddress,
      )}`
    : "Multiple Locations";

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const shouldScroll = window.scrollY > scrollThreshold;
        if (shouldScroll !== lastScrolledRef.current) {
          lastScrolledRef.current = shouldScroll;
          setIsScrolled(shouldScroll);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* Top Bar - Animated entrance/exit */}
      <motion.div
        animate={{
          height: isScrolled ? 0 : 40,
          opacity: isScrolled ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden lg:flex bg-primary text-primary-foreground overflow-hidden"
      >
        <div className="section-container flex items-center justify-between gap-6 bg-primary text-primary-foreground text-sm py-2.5">
          <div className="flex-1 min-w-0  flex items-center gap-6">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <IconMapPin />
              </motion.div>
              <span>{headOfficeDisplay}</span>
            </motion.div>
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={`mailto:${business.email}`}
                className="flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <IconMail />
                </motion.div>
                <span>{business.email}</span>
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={`tel:${business.phone}`}
                className="flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <IconPhone />
                </motion.div>
                <span>{business.phone}</span>
              </Link>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              initial="initial"
              whileHover="hover"
            >
              {[
                { href: business.facebook, Icon: IconBrandFacebook },
                { href: business.instagram, Icon: IconBrandInstagram },
                { href: business.linkedin, Icon: IconBrandLinkedin },
                { href: business.tiktok, Icon: IconBrandTiktok },
              ].map(({ Icon, href }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit MI MedCare on ${Icon.name}`}
                  >
                    <Icon />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            |
            <ThemeSwitch />
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b bg-background/95 backdrop-blur-lg shadow-sm"
            : "bg-background/80 backdrop-blur-lg border-b"
        }`}
      >
        <div
          className={`section-container flex items-center justify-between gap-6 transition-all duration-300 ${
            isScrolled ? "py-3" : "py-4"
          }`}
        >
          {/* Logo with animation */}
          <Logo />

          {/* Desktop Navigation with hover animations */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {HEADER_NAVIGATION.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children && (
                    <>
                      <NavigationMenuTrigger>
                        <motion.span
                          whileHover={{ y: -1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
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

          {/* CTA Buttons with animations */}
          <motion.div
            className="hidden lg:flex items-center gap-4"
            whileHover="hover"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button href="/contact" variant="outline" className="rounded-2xl">
                Contact
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="gradient"
                className="rounded-2xl"
                pulseDelay={5000}
                onClick={() => setIsConsultationOpen(true)}
              >
                Book Consultation
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile */}
          <MobileNav onBookConsultation={() => setIsConsultationOpen(true)} />
        </div>
      </header>

      <FloatingCtas onBookConsultation={() => setIsConsultationOpen(true)} />

      <ConsultationForm
        open={isConsultationOpen}
        onOpenChange={setIsConsultationOpen}
      />
    </>
  );
}
