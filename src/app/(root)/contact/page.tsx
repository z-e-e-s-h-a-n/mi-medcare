import ContactForm from "@/components/ContactForm";
import IconWrapper from "@/components/IconWrapper";
import PageHeader from "@/components/PageHeader";
import { contactDetails } from "@/lib/constants";
import { Clock7, Mails, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact MI MedCare LLC for medical billing, RCM, and healthcare revenue solutions in the USA.",
};

const ContactPage = () => {
  return (
    <>
      <PageHeader title="Contact Us" bgImage="contact" />
      <section className="space-y-8 text-center mb-16">
        <span className="subtitle">Get In Touch</span>
        <h3>Have Questions? We&apos;re Just a Call or Click Away</h3>

        <ul className="flex justify-between flex-wrap gap-8 mt-16 [&_div:has(svg)]:mx-auto [&_a]:hover:text-primary">
          <li className="basis-full sm:basis-[calc(50%-32px)] md:basis-[calc(33.3%-32px)] lg:basis-[calc(25%-32px)] p-5 space-y-4 rounded-2xl shadow-lg border-2 border-primary">
            <IconWrapper variant="primary">
              <PhoneCall />
            </IconWrapper>
            <h4>Phone Number</h4>
            <Link href={`tel:${contactDetails.phone}`}>
              Phone : {contactDetails.phone}
            </Link>
          </li>
          <li className="basis-full sm:basis-[calc(50%-32px)] md:basis-[calc(33.3%-32px)] lg:basis-[calc(25%-32px)] p-5 space-y-4 rounded-2xl shadow-lg border-2 border-primary">
            <IconWrapper variant="primary">
              <Mails />
            </IconWrapper>
            <h4>Mail Address</h4>
            <Link href={`mailto:${contactDetails.email}`}>
              {contactDetails.email}
            </Link>
          </li>
          <li className="basis-full sm:basis-[calc(50%-32px)] md:basis-[calc(33.3%-32px)] lg:basis-[calc(25%-32px)] p-5 space-y-4 rounded-2xl shadow-lg border-2 border-primary">
            <IconWrapper variant="primary">
              <MapPin />
            </IconWrapper>
            <h4>Head Office</h4>
            <Link href="#">{contactDetails.address}</Link>
          </li>
          <li className="basis-full sm:basis-[calc(50%-32px)] md:basis-[calc(33.3%-32px)] lg:basis-[calc(25%-32px)] p-5 space-y-4 rounded-2xl shadow-lg border-2 border-primary">
            <IconWrapper variant="primary">
              <Clock7 />
            </IconWrapper>
            <h4>Work Hours</h4>
            <div>
              <span>Mon to Fri : 9AM - 5PM</span>
            </div>
          </li>
        </ul>

        <div className="flex flex-col-reverse items-end md:flex-row mt-16 [&>form_h4]:text-primary">
          <ContactForm
            classname="text-start basis-full md:basis-1/2"
            title="Send Us A Message"
            titleCn="text-2xl font-medium"
            message="Whether you need help with billing, enrolment, or support, our experts are just a message away. Reach out today."
          />

          <div className="basis-full md:basis-1/2">
            <Image
              src="/images/contact.webp"
              alt="Contact Image"
              width={400}
              height={400}
              className="hidden md:inline-block"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
