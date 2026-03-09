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

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    content: `${business.address}`,
    subtitle: `${business.city}, ${business.state} ${business.postalCode}`,
  },
  {
    icon: Phone,
    title: "Call Us",
    content: business.phone,
    subtitle: "Mon-Fri 9am-6pm PST",
    href: `tel:${business.phone}`,
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    content: business.email,
    subtitle: "24/7 Support Available",
    href: `mailto:${business.email}`,
    action: "Send Email",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Monday - Friday",
    subtitle: "9:00 AM - 6:00 PM PST",
  },
];

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

  const iconVariants = {
    rest: {
      rotate: 0,
      scale: 1,
    },
    hover: {
      rotate: 8,
      scale: 1.1,
      transition: {
        duration: 0.25,
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Card Hover Controller */}
                <motion.div
                  variants={cardVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="group h-full bg-linear-to-b from-background to-background/50 backdrop-blur-sm border rounded-2xl p-6 hover:border-primary/30 transition-all"
                >
                  {/* Icon */}
                  <motion.div variants={iconVariants} className="relative mb-4">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all" />

                    <div className="relative w-14 h-14 bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                  {item.href ? (
                    <Link href={item.href}>
                      <p className="text-primary hover:underline mb-1">
                        {item.content}
                      </p>
                    </Link>
                  ) : (
                    <p className="font-medium mb-1">{item.content}</p>
                  )}

                  <p className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>

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
                </motion.div>
              </motion.div>
            );
          })}
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
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-all">
                        <Icon className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Office:</span>{" "}
                  {business.address}
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
