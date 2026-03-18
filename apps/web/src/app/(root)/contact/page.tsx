import type { Metadata } from "next";
import { ContactPageClient } from "./_page";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Whether you're ready to get started or just exploring options, our team is here to help you optimize your medical billing.",
};

import React from "react";

const ContactPage = () => {
  return <ContactPageClient />;
};

export default ContactPage;
