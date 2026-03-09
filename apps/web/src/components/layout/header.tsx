"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  IconMapPin,
  IconMail,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandWhatsapp,
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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
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
          <div className="flex items-center gap-6">
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
              <span>
                {business.address}, {business.city}, {business.state},{" "}
                {business.postalCode}, {business.country}
              </span>
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
                  <IconBrandWhatsapp />
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
                { href: business.facebook, icon: IconBrandFacebook },
                { href: business.instagram, icon: IconBrandInstagram },
                { href: business.linkedin, icon: IconBrandLinkedin },
                { href: business.tiktok, icon: IconBrandTiktok },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Link href={social.href}>
                    <social.icon />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
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
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/">
              <Image
                src={business.logo.url}
                alt="Logo"
                width={200}
                height={60}
              />
            </Link>
          </motion.div>

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

      <ConsultationForm
        open={isConsultationOpen}
        onOpenChange={setIsConsultationOpen}
      />
    </>
  );
}
