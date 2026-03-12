"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";
import { FOOTER_NAVIGATION, business } from "@/lib/constants";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      {/* Main Footer */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info - Simplified without contact details */}
          <Logo />

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
                      target="_blank"
                      rel="noreferrer"
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
            {[
              { Icon: IconBrandFacebook, href: business.facebook },
              { Icon: IconBrandTwitter, href: business.twitter },
              { Icon: IconBrandInstagram, href: business.instagram },
              { Icon: IconBrandTiktok, href: business.tiktok },
            ].map(({ Icon, href }, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit MI MedCare on ${Icon.name}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  prefetch={false}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
