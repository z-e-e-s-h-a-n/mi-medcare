"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FOOTER_NAVIGATION } from "@/lib/constants";
import { Logo } from "./logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/social-icons";
import { useBusinessProfile } from "@/hooks/useBusinessProfile";
import { useMemo } from "react";

export function Footer() {
  const { data: business } = useBusinessProfile();

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

  return (
    <footer className="bg-muted border-t">
      {/* Main Footer */}
      <div className="section-wrapper py-12">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Company Info - Simplified without contact details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Logo />
              <p className="text-muted-foreground mb-4">
                Comprehensive medical billing and practice management solutions
                for healthcare providers.
              </p>
            </motion.div>

            {/* Footer Links */}
            {FOOTER_NAVIGATION.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <motion.li
                      key={link.label}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MIMedCare. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit MI MedCare on ${label}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background/70 backdrop-blur-sm hover:bg-background transition-colors"
                    prefetch={false}
                  >
                    <Icon
                      className={
                        label === "X" ? "h-5 w-5 dark:text-white" : "h-5 w-5"
                      }
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
