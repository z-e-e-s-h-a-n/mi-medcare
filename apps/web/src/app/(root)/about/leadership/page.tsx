import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the leaders behind MI MedCare.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Leadership"
        badge="Company"
        description="Meet the leaders behind MI MedCare."
        imageUrl="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1920"
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

