import { contactDetails } from "@constants/app";
import { mainMenu, servicesMenu } from "@constants/menu";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div>
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
          <div>
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
        <div>
          <h4>Services</h4>
          <nav>
            {servicesMenu.map((link) => (
              <Link href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4>Quick Links</h4>
          <nav>
            {mainMenu.map((link) => (
              <Link href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4>Get In Touch</h4>
          <nav>
            <Link href="">{contactDetails.address}</Link>
            <Link href={`mailto:${contactDetails.email}`}>
              Email: {contactDetails.email}
            </Link>
            <Link href={`tel:${contactDetails.phone}`}>
              Phone: {contactDetails.phone}
            </Link>
          </nav>
        </div>
      </div>
      <div>
        <p>Mimedcarellc © All Rights Reserved.​</p>
        <p>
          Website Designed by{" "}
          <Link href="https://jzdlabs.com/">
            <strong>JZ Digital Lab</strong>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
