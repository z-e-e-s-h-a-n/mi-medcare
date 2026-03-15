import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";

export const metadata: Metadata = {
  title: "News & Press",
  description: "Announcements, updates, and press releases from MI MedCare.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="News & Press"
        badge="Company"
        description="Announcements, updates, and press releases from MI MedCare."
        imageUrl="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <ComingSoonSection
        backHref="/"
        badge="Coming Soon"
        title="We are preparing something exciting & amazing for you."
        description="Coming Soon!"
      />
    </>
  );
}

