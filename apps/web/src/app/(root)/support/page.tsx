import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";

export const metadata: Metadata = {
  title: "Technical Support",
  description: "Get help with access, integrations, and billing operations support.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Technical Support"
        badge="Support"
        description="Get help with access, integrations, and billing operations support."
        imageUrl="https://images.pexels.com/photos/8867440/pexels-photo-8867440.jpeg?auto=compress&cs=tinysrgb&w=1920"
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

