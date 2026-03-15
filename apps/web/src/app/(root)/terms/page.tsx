import type { Metadata } from "next";

import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { TermsContent } from "@/components/legal/terms-content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing use of the MI MedCare website.",
};

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms & Conditions"
      badge="Legal"
      description="Terms governing use of the MI MedCare website."
      imageUrl="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1920"
      toc={[
        { id: "intro", label: "Agreement" },
        { id: "services", label: "Services" },
        { id: "sms", label: "SMS program" },
        { id: "responsibilities", label: "Responsibilities" },
        { id: "ip", label: "Intellectual property" },
        { id: "liability", label: "Liability" },
        { id: "changes", label: "Modifications" },
        { id: "law", label: "Governing law" },
        { id: "contact", label: "Contact" },
      ]}
    >
      <TermsContent />
    </LegalPageShell>
  );
}
