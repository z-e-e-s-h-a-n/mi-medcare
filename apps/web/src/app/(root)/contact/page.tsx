/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "motion/react";
import { easeOut } from "motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { business } from "@/lib/constants";
import { FAQSection } from "@/components/sections/faq-section";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { formatBusinessAddress } from "@/lib/utils";

const headOfficeAddress = business.addresses?.[0];
const branchAddresses = business.addresses?.slice(1) ?? [];

// Address card with all branches shown
const addressCard = {
  icon: MapPin,
  title: "Our Locations",
  content: "Multiple Offices to Serve You",
  extra: (
    <div className="space-y-3 mt-3">
      {headOfficeAddress && (
        <div>
          <p className="text-sm font-semibold text-foreground">Head Office</p>
          <p className="text-sm text-muted-foreground">
            {formatBusinessAddress(headOfficeAddress)}
          </p>
        </div>
      )}

      {branchAddresses.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-foreground">
            Branch {branchAddresses.length > 1 ? "Locations" : "Location"}
          </p>
          {branchAddresses.map((address) => (
            <p key={address.line1} className="text-sm text-muted-foreground">
              {address.label ? `${address.label}: ` : ""}
              {formatBusinessAddress(address)}
            </p>
          ))}
        </div>
      )}
    </div>
  ),
};

const callCard = {
  icon: Phone,
  title: "Call Us",
  content: business.phone,
  subtitle: "Mon-Fri 9am-6pm PST",
  href: `tel:${business.phone}`,
  action: "Call Now",
};

const whatsappCard = {
  icon: IconBrandWhatsapp,
  title: "WhatsApp",
  content: business.whatsapp,
  subtitle: "Quick replies via chat",
  href: `https://wa.me/${business.whatsapp}`,
  action: "Send Message",
  iconColor: "text-[#25D366]", // WhatsApp green color
  external: true, // Mark as external link
};

const emailCard = {
  icon: Mail,
  title: "Email Us",
  content: business.email,
  subtitle: "24/7 Support Available",
  href: `mailto:${business.email}`,
  action: "Send Email",
};

const hoursCard = {
  icon: Clock,
  title: "Business Hours",
  content: "Monday - Friday",
  subtitle: "9:00 AM - 6:00 PM PST",
  extra: (
    <div className="mt-2 text-sm text-muted-foreground">
      <p>Weekends: Closed</p>
    </div>
  ),
};

// Social Links
const socialLinks = [
  { icon: IconBrandFacebook, href: business.facebook, label: "Facebook" },
  { icon: IconBrandInstagram, href: business.instagram, label: "Instagram" },
  { icon: IconBrandLinkedin, href: business.linkedin, label: "LinkedIn" },
  { icon: IconBrandTiktok, href: business.tiktok, label: "TikTok" },
  {
    icon: IconBrandWhatsapp,
    href: `https://wa.me/${business.whatsapp}`,
    label: "WhatsApp",
  },
];

export default function ContactPage() {
  const cardVariants = {
    rest: { y: 0 },
    hover: { y: -5 },
  };

  // Fixed icon animation to prevent overflow
  const iconVariants = {
    rest: {
      rotate: 0,
      scale: 1,
    },
    hover: {
      rotate: 3,
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: easeOut,
      },
    },
  };

  const actionVariants = {
    rest: { opacity: 0, x: -10 },
    hover: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  const renderContactCard = (item: any, index: any, customDelay = 0) => {
    const Icon = item.icon;
    const hasHref = "href" in item && item.href;

    // Card content
    const cardContent = (
      <>
        {/* Icon */}
        <motion.div
          variants={iconVariants}
          className="relative mb-4 overflow-visible"
        >
          {/* Blur effect */}
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all" />

          {/* Icon container */}
          <div className="relative w-14 h-14 bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center border border-primary/20 overflow-hidden">
            <Icon
              className={`w-7 h-7 ${item.iconColor || "text-primary"} transform-gpu`}
            />
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

        {hasHref ? (
          <p className="text-primary mb-1">{item.content}</p>
        ) : (
          <p className="font-medium mb-1">{item.content}</p>
        )}

        <p className="text-sm text-muted-foreground">{item.subtitle}</p>

        {"extra" in item && item.extra ? (
          <div className="mt-2">{item.extra}</div>
        ) : null}

        {/* Action */}
        {item.action && (
          <motion.div
            variants={actionVariants}
            className="mt-3 text-xs text-primary font-medium flex items-center gap-1"
          >
            {item.action}
            <ArrowRight className="w-3 h-3" />
          </motion.div>
        )}
      </>
    );

    // If card has href, wrap in Link component
    if (hasHref) {
      return (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + customDelay }}
        >
          <Link
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="block cursor-pointer"
          >
            <motion.div
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group h-full bg-linear-to-b from-background to-background/50 backdrop-blur-sm border rounded-2xl p-6 hover:border-primary/30 transition-all overflow-hidden"
            >
              {cardContent}
            </motion.div>
          </Link>
        </motion.div>
      );
    }

    // Card without href
    return (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + customDelay }}
      >
        <motion.div
          variants={cardVariants}
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="group h-full bg-linear-to-b from-background to-background/50 backdrop-blur-sm border rounded-2xl p-6 hover:border-primary/30 transition-all overflow-hidden"
        >
          {cardContent}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <PageHeader
        title="Let's Talk About Your
Revenue Cycle"
        description="Whether you're ready to get started or just exploring options, our team is here to help you optimize your medical billing."
        badge="Get in Touch"
      />

      {/* Contact Info Cards Section */}
      <section className="section-container py-20">
        <div className="space-y-6">
          {/* Address Card - Full Width */}
          <div className="grid grid-cols-1">
            {renderContactCard(addressCard, 0)}
          </div>

          {/* Call, WhatsApp, Email, Hours Cards - 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderContactCard(callCard, 1, 0.1)}
            {renderContactCard(whatsappCard, 2, 0.15)}
            {renderContactCard(emailCard, 3, 0.2)}
            {renderContactCard(hoursCard, 4, 0.25)}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="section-container pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-linear-to-br from-background to-background/50 backdrop-blur-sm border rounded-2xl p-8">
              <ContactForm />
            </div>
          </motion.div>

          {/* Map & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Map */}
            <div className="bg-linear-to-br from-background to-background/50 backdrop-blur-sm border rounded-2xl p-6 h-100 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.123456789!2d-121.4944!3d38.5816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDM0JzUzLjgiTiAxMjHCsDI5JzQwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MI MedCare Location"
              />
            </div>

            {/* Social Connect */}
            <div className="bg-linear-to-br from-background to-background/50 backdrop-blur-sm border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-all overflow-hidden">
                        <Icon className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors transform-gpu" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Head Office:
                  </span>{" "}
                  {headOfficeAddress ? (
                    <>
                      {formatBusinessAddress(headOfficeAddress)}
                      <br />
                      <span className="text-xs block mt-1">
                        {headOfficeAddress.city}, {headOfficeAddress.state}{" "}
                        {headOfficeAddress.postalCode}
                      </span>
                    </>
                  ) : (
                    "Multiple Locations"
                  )}
                  <br />
                  <span className="font-semibold text-foreground">
                    Hours:
                  </span>{" "}
                  Mon-Fri, 9:00 AM - 6:00 PM PST
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}
