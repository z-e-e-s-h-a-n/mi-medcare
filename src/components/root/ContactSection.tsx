"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section
      id="contact-section"
      className="py-24 relative flex-col lg:flex-row flex justify-between bg-primary overflow-hidden"
    >
      <div className="space-y-4 lg:max-w-xl">
        <span className="subtitle text-primary-foreground">
          Free Consultation
        </span>
        <h2 className="text-primary-foreground">
          Schedule a Free Consultation with Our Billing Experts
        </h2>
        <ContactForm classname="p-8 lg:p-18 bg-background rounded-2xl grid" />
        <Image
          src="/images/contact.webp"
          alt="Contact Image"
          width={340}
          height={500}
          className="absolute left-[60%] md:left-1/2 bottom-0 w-1/2 md:w-auto"
        />
      </div>
      <div className="p-8 w-xs h-max bg-primary-foreground rounded-2xl space-y-4">
        <span className="text-2xl font-medium">Work Hours</span>
        <p>
          Expert billing support available so your revenue cycle never sleeps
        </p>
        <ul className="space-y-2 mt-8">
          <li className="flex items-center justify-between">
            <span>Monday </span> <span>9AM - 5PM</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Tuesday </span> <span>9AM - 5PM</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Wednesday </span> <span>9AM - 5PM</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Thursday </span> <span>9AM - 5PM</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Friday </span> <span>9AM - 5PM</span>
          </li>
        </ul>
        <Button size="lg" href="/contact" className="mt-8 w-full">
          Contact Us
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;
