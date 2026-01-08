"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section id="contact-section" className="contact-section">
      <div>
        <span>Free Consultation</span>
        <h2>Schedule a Free Consultation with Our Billing Experts</h2>
        <ContactForm />
        <Image
          src="/images/contact.webp"
          alt="Contact Image"
          width={340}
          height={500}
        />
      </div>
      <div>
        <span>Work Hours</span>
        <p>
          Expert billing support available so your revenue cycle never sleeps
        </p>
        <ul>
          <li>
            <span>Monday </span> <span>9AM - 5PM</span>
          </li>
          <li>
            <span>Tuesday </span> <span>9AM - 5PM</span>
          </li>
          <li>
            <span>Wednesday </span> <span>9AM - 5PM</span>
          </li>
          <li>
            <span>Thursday </span> <span>9AM - 5PM</span>
          </li>
          <li>
            <span>Friday </span> <span>9AM - 5PM</span>
          </li>
        </ul>
        <Button size="lg" href="/contact" className="w-full">
          Contact Us
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;
