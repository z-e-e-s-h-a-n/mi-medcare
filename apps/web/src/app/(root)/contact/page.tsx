import type { Metadata } from "next";
import { _ContactPage } from "./_page";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Whether you're ready to get started or just exploring options, our team is here to help you optimize your medical billing.",
};

import React from "react";

const ContactPage = () => {
  return <_ContactPage />;
};

export default ContactPage;
