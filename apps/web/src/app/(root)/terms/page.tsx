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
        { id: "intro", label: "Overview" },
        { id: "who", label: "Who we are" },
        { id: "use", label: "Use of site" },
        { id: "info", label: "Informational content" },
        { id: "submissions", label: "Submissions" },
        { id: "third-party", label: "Third-party links" },
        { id: "ip", label: "Intellectual property" },
        { id: "disclaimer", label: "Disclaimer" },
        { id: "liability", label: "Liability" },
        { id: "privacy", label: "Privacy" },
        { id: "changes", label: "Changes" },
        { id: "contact", label: "Contact" },
      ]}
    >
      <TermsContent />
    </LegalPageShell>
  );
}
