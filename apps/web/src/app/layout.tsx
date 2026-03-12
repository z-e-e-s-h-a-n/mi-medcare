import "@workspace/ui/globals.css";
import { Inter, Poppins } from "next/font/google";
import ProviderWrapper from "@workspace/ui/provider-wrapper";
import { business } from "@/lib/constants";
import type { AppLayoutProps } from "@workspace/contracts";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

const primaryFont = Poppins({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const secondaryFont = Inter({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Medical Billing Services in USA",
    template: "%s | MI MedCare",
  },
  description:
    "MI MedCare LLC offers professional medical billing services in the USA for family practice, internal medicine, mental health & urgent care. Increase revenue, reduce denials & stay HIPAA compliant.",

  icons: {
    icon: business.favicon.url,
  },

  robots: {
    index: true,
    follow: true,
  },

  authors: [
    {
      name: "MI MedCare LLC",
      url: "https://www.mimedcarellc.com",
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
    url: "https://www.mimedcarellc.com",
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

const RootLayout = ({ children }: AppLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="czbQ2_F4AE2zI66qUe-473yuffmrVgF3YvPeJoHJImQ"
        />
      </head>
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} font-sans antialiased`}
      >
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
      <GoogleAnalytics gaId="G-3GCVD9KWT0" />
    </html>
  );
};

export default RootLayout;
