import React from "react";
import type { AppLayoutProps } from "@workspace/contracts";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/sections/cta-section";

const Layout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <CTASection />
      <Footer />
    </>
  );
};

export default Layout;
