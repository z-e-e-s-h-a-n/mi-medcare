import type { Metadata } from "next";

import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { PrivacyPolicyContent } from "@/components/legal/privacy-policy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect information on this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      badge="Legal"
      description="How we collect, use, and protect information on this website."
      imageUrl="https://images.pexels.com/photos/5380643/pexels-photo-5380643.jpeg?auto=compress&cs=tinysrgb&w=1920"
      toc={[
        { id: "intro", label: "Introduction" },
        { id: "collect", label: "Information we collect" },
        { id: "use", label: "How we use it" },
        { id: "sms", label: "SMS consent" },
        { id: "share", label: "Sharing" },
        { id: "security", label: "Data security" },
        { id: "cookies", label: "Cookies" },
        { id: "third-party", label: "Third-party links" },
        { id: "updates", label: "Updates" },
        { id: "contact", label: "Contact" },
      ]}
    >
      <PrivacyPolicyContent />
    </LegalPageShell>
  );
}

