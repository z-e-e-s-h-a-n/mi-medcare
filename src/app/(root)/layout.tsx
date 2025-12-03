import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";

const Layout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      <PromoPopup />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
