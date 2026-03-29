import "@workspace/ui/globals.css";
import { Suspense } from "react";
import { Inter, Poppins } from "next/font/google";
import ProviderWrapper from "@workspace/ui/provider-wrapper";
import type { AppLayoutProps } from "@workspace/contracts";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import { getCachedBusinessProfile } from "@/lib/business-profile";
import { BusinessProfileProvider } from "@/providers/business-profile-provider";
import TrafficSourceTracker from "@/providers/traffic-source-tracker";

const primaryFont = Poppins({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const secondaryFont = Inter({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const business = await getCachedBusinessProfile();

  return {
    title: {
      default: business.metaTitle,
      template: "%s | MI MedCare",
    },
    description: business.metaDescription,

    icons: {
      icon: business.favicon.url,
    },

    robots: {
      index: true,
      follow: true,
    },

    authors: [
      {
        name: business.legalName,
        url: business.website,
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
      title: business.metaTitle,
      description: business.metaDescription,
      url: business.website,
      siteName: business.name,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: business.metaTitle,
      description: business.metaDescription,
    },
  };
}

const RootLayout = async ({ children }: AppLayoutProps) => {
  const business = await getCachedBusinessProfile();

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
        <ProviderWrapper>
          <BusinessProfileProvider business={business}>
            <Suspense fallback={null}>
              <TrafficSourceTracker />
            </Suspense>
            {children}
          </BusinessProfileProvider>
        </ProviderWrapper>
      </body>
      <GoogleAnalytics gaId="G-3GCVD9KWT0" />
    </html>
  );
};

export default RootLayout;
