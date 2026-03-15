import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Secure portal access for clients and partners.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Client Portal"
        badge="Support"
        description="Secure portal access for clients and partners."
        imageUrl="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920"
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

