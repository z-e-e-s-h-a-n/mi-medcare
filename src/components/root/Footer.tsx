import { contactDetails } from "@constants/app";
import { mainMenu, servicesMenu } from "@constants/menu";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="section-container py-16 bg-primary/10 flex flex-wrap justify-between gap-8 text-sm [&_a]:hover:text-primary">
        <div className="space-y-4 basis-full sm:basis-[calc(50%-32px)] lg:basis-[calc(25%-32px)]">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={60}
            aria-label="Logo"
          />
          <p>
            Whether you need help with billing, enrolment, or support, our
            experts are just a message away. Reach out today.
          </p>
          <div className="flex items-center gap-4 text-primary [&_svg]:size-6">
            <Link
              href="https://www.facebook.com/mimedcarellc"
              target="_blank"
              aria-label="Facebook Link"
            >
              <Facebook />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mm-alam-freelancer"
              target="_blank"
              aria-label="LinkedinLink"
            >
              <Linkedin />
            </Link>
            <Link
              href="https://www.instagram.com/mahmoodalamlahore"
              target="_blank"
              aria-label="Instagram Link"
            >
              <Instagram />
            </Link>
          </div>
        </div>
        <div className="space-y-4 basis-full sm:basis-[calc(50%-32px)] lg:basis-[calc(25%-32px)]">
          <h4 className="text-2xl font-medium">Services</h4>
          <nav className="flex flex-col gap-2">
            {servicesMenu.map((link) => (
              <Link href={link.href} key={link.title} className="">
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-4 basis-full sm:basis-[calc(50%-32px)] lg:basis-[calc(25%-32px)]">
          <h4 className="text-2xl font-medium">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {mainMenu.map((link) => (
              <Link href={link.href} key={link.title} className="">
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-4 basis-full sm:basis-[calc(50%-32px)] lg:basis-[calc(25%-32px)]">
          <h4 className="text-2xl font-medium">Get In Touch</h4>
          <nav className="flex flex-col gap-2">
            <Link href="" className="">
              {contactDetails.address}
            </Link>
            <Link href={`mailto:${contactDetails.email}`} className="">
              Email: {contactDetails.email}
            </Link>
            <Link href={`tel:${contactDetails.phone}`} className="">
              Phone: {contactDetails.phone}
            </Link>
          </nav>
        </div>
      </div>
      <div className="section-container flex flex-wrap gap-x-4 md:justify-between md:items-center py-2 bg-primary text-primary-foreground">
        <p>Mimedcarellc © All Rights Reserved.​</p>
        <p className="basis-full sm:basis-[calc(50%-16px)] sm:text-center">
          Website Designed by{" "}
          <Link
            href="https://jzdlabs.com/"
            className="text-right sm:text-start"
          >
            <strong>JZ Digital Lab</strong>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
