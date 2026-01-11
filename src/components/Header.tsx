"use client";

import { Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { contactDetails } from "@/lib/constants";

const Header = () => {
  return (
    <header className="header">
      <div className="text-sm">
        <div>
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
      <div>
        <Image src="/images/logo.png" alt="Logo" width={200} height={60} />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
