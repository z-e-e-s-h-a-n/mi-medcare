import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect information on this website.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        badge="Legal"
        description="How we collect, use, and protect information on this website."
        imageUrl="https://images.pexels.com/photos/5380643/pexels-photo-5380643.jpeg?auto=compress&cs=tinysrgb&w=1920"
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

