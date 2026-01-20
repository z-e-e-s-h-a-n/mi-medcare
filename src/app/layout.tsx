import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const primaryFont = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Medical Billing Services in USA",
    template: "%s | MI MedCare",
  },
  description:
    "MI MedCare LLC offers expert medical billing and revenue cycle management services, helping healthcare providers maximize reimbursements and streamline operations.",
};

function RootLayout({ children }: AppLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="czbQ2_F4AE2zI66qUe-473yuffmrVgF3YvPeJoHJImQ"
        />
      </head>
      <body className={`${primaryFont.variable} antialiased`}>{children}</body>
      <GoogleAnalytics gaId="G-3GCVD9KWT0" />
    </html>
  );
}

export default RootLayout;
