import { NotFound } from "@/components/layout/not-found";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | MI MedCare",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

function NotFoundPage() {
  return <NotFound />;
}

export default NotFoundPage;
