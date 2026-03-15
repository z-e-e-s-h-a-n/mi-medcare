import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";

export const metadata: Metadata = {
  title: "HIPAA Compliance",
  description: "Our HIPAA-focused approach to privacy, security, and safeguards.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="HIPAA Compliance"
        badge="Compliance"
        description="Our HIPAA-focused approach to privacy, security, and safeguards."
        imageUrl="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1920"
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

