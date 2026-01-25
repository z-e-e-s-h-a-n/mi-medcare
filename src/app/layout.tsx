import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import ProviderWrapper from "@/provider";

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
    "MI MedCare LLC offers professional medical billing services in the USA for family practice, internal medicine, mental health & urgent care. Increase revenue, reduce denials & stay HIPAA compliant.",

  robots: {
    index: true,
    follow: true,
  },

  authors: [
    {
      name: "MI MedCare LLC",
      url: "https://www.mimedcare.com",
    },
  ],

  keywords: [
    "medical billing services in USA",
    "medical billing company USA",
    "medical billing for family practice",
    "medical billing for internal medicine",
    "medical billing for mental health clinics",
    "medical billing for urgent care",
    "outsourced medical billing USA",
    "HIPAA compliant medical billing",
  ],

  openGraph: {
    title: "Medical Billing Services in USA | MI MedCare",
    description:
      "Professional medical billing services for family practice, internal medicine, mental health & urgent care.",
    url: "https://mimedcare.com",
    siteName: "MI MedCare",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Medical Billing Services in USA | MI MedCare",
    description:
      "HIPAA compliant medical billing services to increase revenue and reduce denials.",
  },
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
      <body className={`${primaryFont.variable} antialiased`}>
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </body>
      <GoogleAnalytics gaId="G-3GCVD9KWT0" />
    </html>
  );
}

export default RootLayout;
