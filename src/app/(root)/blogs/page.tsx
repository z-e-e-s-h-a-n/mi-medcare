import BlogList from "@components/blog/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Explore MI MedCare LLC's specialized medical billing services for acupuncture, anesthesia, behavioral health, cardiology, and 20+ other specialties to optimize your revenue cycle.",
};

const page = () => {
  return <BlogList />;
};

export default page;
