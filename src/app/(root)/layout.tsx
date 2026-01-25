import React from "react";
import Header from "@components/root/Header";
import Footer from "@components/root/Footer";

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
