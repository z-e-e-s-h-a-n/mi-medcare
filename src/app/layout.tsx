import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const primaryFont = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - MI MedCare LLC",
  description:
    "MI MedCare LLC offers expert medical billing and revenue cycle management services, helping healthcare providers maximize reimbursements and streamline operations.",
};

function RootLayout({ children }: AppLayoutProps) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="4eWa9f0XKfV1elqMD2bidFeBsv_wj3ajWyXl9pT5ga0"
      />
      <body className={`${primaryFont.variable} antialiased`}>{children}</body>
    </html>
  );
}

export default RootLayout;
