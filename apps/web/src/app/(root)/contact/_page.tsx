/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "motion/react";
import { easeOut } from "motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock, Printer } from "lucide-react";
import { GHL_CONTACT_FORM_IFRAME_SRC } from "@/lib/constants";
import { FAQSection } from "@/components/sections/faq-section";
import { PageHeader } from "@/components/layout/page-header";
import Image from "next/image";
import Script from "next/script";
import { SectionHeader } from "@/components/layout/section-header";
import { cn } from "@workspace/ui/lib/utils";
import { formatBusinessAddress, gradientClass } from "@/lib/utils";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  WhatsAppIcon,
} from "@/components/icons/social-icons";
import { useBusinessProfile } from "@/hooks/business";

export function ContactPageClient() {
  const { data: business } = useBusinessProfile();

  const headOfficeAddress = business.addresses?.[0];
  const branchAddresses = business.addresses?.slice(1) ?? [];

  const addressCard = {
    icon: MapPin,
    title: "Our Locations",
    content: "Multiple Offices to Serve You",
    gradient: "from-rose-500 to-pink-500",
    iconColor: "text-white",
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

  const phonesCard = {
    icon: Phone,
    title: "Phones",
    content: "Available during business hours",
    gradient: "from-blue-500 to-cyan-500",
    iconColor: "text-white",
    extra: (
      <div className="mt-3 space-y-2">
        {business.phones.map((n) => (
          <a
            key={n.value}
            href={`tel:${n.value}`}
            className={cn(
              "block text-sm font-semibold hover:underline",
              gradientClass("from-blue-500 to-cyan-500", { type: "text" }),
            )}
          >
            {n.label}
          </a>
        ))}
      </div>
    ),
  };

  const faxCard = {
    icon: Printer,
    title: "Fax",
    content: "Virtual fax numbers",
    gradient: "from-slate-600 to-slate-500",
    iconColor: "text-white",
    extra: (
      <div className="mt-3 space-y-2">
        {business.fax.map((n) => (
          <a
            key={n.value}
            href={`tel:${n.value}`}
            className={cn(
              "block text-sm font-semibold hover:underline",
              gradientClass("from-slate-600 to-slate-500", { type: "text" }),
            )}
          >
            {n.label}
          </a>
        ))}
      </div>
    ),
  };

  const whatsappCard = {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    content: business.whatsapp.label,
    subtitle: "Quick replies via chat",
    href: `https://wa.me/${business.whatsapp.value.replace("+", "")}`,
    action: "Send Message",
    gradient: "from-emerald-500 to-green-500",
    iconColor: "text-white",
    external: true,
  };

  const emailCard = {
    icon: Mail,
    title: "Email Us",
    content: business.email,
    subtitle: "24/7 Support Available",
    href: `mailto:${business.email}`,
    action: "Send Email",
    gradient: "from-purple-500 to-indigo-500",
    iconColor: "text-white",
  };

  const hoursCard = {
    icon: Clock,
    title: "Business Hours",
    content: business.officeHoursDays,
    subtitle: business.officeHoursTime,
    gradient: "from-orange-500 to-amber-500",
    iconColor: "text-white",
    extra: (
      <div className="mt-2 text-sm text-muted-foreground">
        <p>Weekends: Closed</p>
      </div>
    ),
  };

  const socialLinks = [
    {
      icon: FacebookIcon,
      href: business.facebook,
      label: "Facebook",
    },
    {
      icon: XIcon,
      href: business.twitter,
      label: "X",
      iconClassName: "dark:text-white",
    },
    {
      icon: InstagramIcon,
      href: business.instagram,
      label: "Instagram",
    },
    {
      icon: LinkedInIcon,
      href: business.linkedin,
      label: "LinkedIn",
    },
    {
      icon: WhatsAppIcon,
      href: `https://wa.me/${business.whatsapp.value.replace("+", "")}`,
      label: "WhatsApp",
    },
  ];

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
    const accent = item.gradient ?? "from-primary to-secondary";

    // Card content
    const cardContent = (
      <>
        {/* Watermark */}
        <div className="pointer-events-none absolute -right-8 -top-8 opacity-[0.06]">
          <Icon className="w-28 h-28" />
        </div>

        {/* Icon */}
        <motion.div
          variants={iconVariants}
          className="relative mb-4 overflow-visible"
        >
          {/* Blur effect */}
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-xl transition-all",
              gradientClass(accent, { direction: "br", opacity: 10 }),
              "group-hover:opacity-80 opacity-50",
            )}
          />

          {/* Icon container */}
          <div
            className={cn(
              "relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden shadow-md border border-white/15",
              gradientClass(accent, { direction: "br" }),
            )}
          >
            <Icon
              className={`w-7 h-7 ${item.iconColor || "text-white"} transform-gpu`}
            />
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

        {hasHref ? (
          <p
            className={cn(
              "mb-1 font-semibold",
              gradientClass(accent, { type: "text" }),
            )}
          >
            {item.content}
          </p>
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
            className={cn(
              "mt-3 text-xs font-medium flex items-center gap-1",
              gradientClass(accent, { type: "text" }),
            )}
          >
            {item.action}
            <ArrowRight className="w-3 h-3" />
          </motion.div>
        )}

        {/* Accent line */}
        <div
          className={cn(
            "absolute bottom-0 left-0 h-0.5 w-full opacity-40",
            gradientClass(accent),
          )}
        />
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
              className={cn(
                "group relative h-full rounded-2xl border border-border/60 p-6 overflow-hidden backdrop-blur-xl shadow-sm transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-xl hover:border-primary/30",
                gradientClass(accent, { direction: "br", opacity: 8 }),
              )}
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
          className={cn(
            "group relative h-full rounded-2xl border border-border/60 p-6 overflow-hidden backdrop-blur-xl shadow-sm transition-all duration-300",
            "hover:-translate-y-1 hover:shadow-xl hover:border-primary/30",
            gradientClass(accent, { direction: "br", opacity: 8 }),
          )}
        >
          {cardContent}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <PageHeader
        title="Let's Talk About Your Revenue Cycle"
        description="Whether you're ready to get started or just exploring options, our team is here to help you optimize your medical billing."
        subtitle="Get in Touch"
        imageUrl="https://images.pexels.com/photos/7195379/pexels-photo-7195379.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Contact Info Cards Section */}
      <section className="section-wrapper">
        <div className="section-container">
          <SectionHeader
            subtitle="Contact"
            title="Reach Us Your Way"
            description="Choose the fastest option to connect with our team — call, WhatsApp, email, or send a message."
          />

          <div className="space-y-6">
            {/* Locations + Hours */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderContactCard(addressCard, 0)}
              {renderContactCard(hoursCard, 1, 0.05)}
            </div>

            {/* Phones, WhatsApp, Email, Fax */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderContactCard(phonesCard, 2, 0.1)}
              {renderContactCard(whatsappCard, 3, 0.15)}
              {renderContactCard(emailCard, 4, 0.2)}
              {renderContactCard(faxCard, 5, 0.25)}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="relative section-wrapper bg-muted py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-secondary/15 blur-3xl" />
        </div>
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-background/70 backdrop-blur-xl border border-border/60 rounded-2xl p-8 shadow-sm overflow-hidden">
                <div className="pointer-events-none absolute -right-10 -top-10 opacity-20">
                  <Image
                    src="/images/rcm-platform.png"
                    alt="RCM platform"
                    width={280}
                    height={280}
                    className="w-60 h-60 object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold">Send Us a Message</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This form is hosted securely in our system for A2P
                      approval. Our website form will return after approval.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/60 overflow-hidden">
                    <iframe
                      src={GHL_CONTACT_FORM_IFRAME_SRC}
                      style={{
                        width: "100%",
                        height: "823px",
                        border: "none",
                        borderRadius: "12px",
                      }}
                      id="inline-GssV1mgq5YNfEnZ152Mi"
                      data-layout="{'id':'INLINE'}"
                      data-trigger-type="alwaysShow"
                      data-trigger-value=""
                      data-activation-type="alwaysActivated"
                      data-activation-value=""
                      data-deactivation-type="neverDeactivate"
                      data-deactivation-value=""
                      data-form-name="Contact us Form A2P Approval"
                      data-height="823"
                      data-layout-iframe-id="inline-GssV1mgq5YNfEnZ152Mi"
                      data-form-id="GssV1mgq5YNfEnZ152Mi"
                      title="Contact us Form A2P Approval"
                    />
                  </div>

                  <Script
                    src="https://link.msgsndr.com/js/form_embed.js"
                    strategy="afterInteractive"
                  />
                </div>
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
              <div className="bg-background/70 backdrop-blur-xl border border-border/60 rounded-2xl p-6 h-100 overflow-hidden shadow-sm">
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
              <div className="bg-background/70 backdrop-blur-xl border border-border/60 rounded-2xl p-6 shadow-sm">
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
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-background/60 via-primary/5 to-accent/10 backdrop-blur-sm flex items-center justify-center border border-border/70 hover:border-primary/25 transition-all overflow-hidden shadow-sm hover:shadow-md">
                          <Icon
                            className={`w-5 h-5 transition-transform transform-gpu group-hover:scale-110 ${social.iconClassName ?? ""}`}
                          />
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
                          {headOfficeAddress.zip}
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
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}
