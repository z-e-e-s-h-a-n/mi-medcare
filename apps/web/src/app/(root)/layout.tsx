import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const Layout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
