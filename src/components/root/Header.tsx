"use client";

import { Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { contactDetails } from "@constants/app";

const Header = () => {
  return (
    <header className="header">
      <div className="text-sm section-container bg-primary text-primary-foreground flex-wrap justify-between items-center gap-x-4 py-2 hidden md:flex [&_a]:flex-center [&_a]:gap-2">
        <div className="flex items-center gap-4">
          <Link href={`tel:${contactDetails.phone}`}>
            <PhoneCall />
            {contactDetails.phone}
          </Link>
          <Link href={`mailto:${contactDetails.email}`}>
            <Mail />
            {contactDetails.email}
          </Link>
        </div>
        <Link href="">
          <MapPin /> {contactDetails.address}
        </Link>
      </div>
      <div className="section-container flex justify-between items-center bg-primary/10 py-2">
        <Image src="/images/logo.png" alt="Logo" width={200} height={60} />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
