import type { Metadata } from "next";

import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { CookiePolicyContent } from "@/components/legal/cookie-policy-content";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How MI MedCare uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPageShell
      title="Cookie Policy"
      badge="Legal"
      description="How MI MedCare uses cookies and similar technologies."
      imageUrl="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920"
      toc={[
        { id: "intro", label: "Overview" },
        { id: "what", label: "What are cookies?" },
        { id: "types", label: "Cookie types" },
        { id: "manage", label: "Manage cookies" },
        { id: "dnt", label: "Do Not Track" },
        { id: "contact", label: "Contact" },
      ]}
    >
      <CookiePolicyContent />
    </LegalPageShell>
  );
}
