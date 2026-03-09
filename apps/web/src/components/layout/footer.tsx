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
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background/50 border-t">
      {/* Main Footer */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info - Simplified without contact details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-4">
              <Image
                src={business.logo.url}
                alt="Logo"
                width={200}
                height={60}
              />
            </Link>
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
              <h4 className="font-semibold mb-4">{section.title}</h4>
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
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={Icon.name}
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
