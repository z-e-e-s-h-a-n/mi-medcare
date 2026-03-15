import { business } from "@/lib/constants";
import { LegalTopCards } from "@/components/legal/legal-top-cards";

export function PrivacyPolicyContent() {
  return (
    <>
      <LegalTopCards
        items={[
          { label: "Effective date", value: "March 15, 2026" },
          { label: "Applies to", value: "Website + inquiries" },
          { label: "Quick note", value: "Don’t submit PHI" },
        ]}
      />

      <section id="intro">
        <h2 className="scroll-mt-24">Overview</h2>
        <p>
          This Privacy Policy explains how <strong>{business.legalName}</strong>{" "}
          (&quot;MI MedCare&quot;, &quot;we&quot;, &quot;us&quot;) collects,
          uses, discloses, and protects information when you visit our website,
          contact us, or subscribe to our updates.
        </p>
      </section>

      <section id="scope">
        <h2 className="scroll-mt-24">Scope</h2>
        <ul>
          <li>
            <strong>Website visitors:</strong> Information collected through
            pages, forms, and communications.
          </li>
          <li>
            <strong>Clients and prospects:</strong> Information you submit to
            request a consultation, proposal, or support.
          </li>
          <li>
            <strong>Not a patient portal:</strong> Our public website is not a
            patient portal. Please do not submit medical records or sensitive
            patient data through website forms.
          </li>
        </ul>
      </section>

      <section id="collect">
        <h2 className="scroll-mt-24">Information we collect</h2>
        <h3>Information you provide</h3>
        <ul>
          <li>
            Contact and business details (name, practice name, email, phone
            number) when you submit our contact or consultation forms.
          </li>
          <li>
            Message content you type into forms (for example, questions about
            your billing workflow).
          </li>
          <li>Newsletter subscription details (name and email).</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            Device and usage data such as IP address, browser type, approximate
            location (city/state), pages viewed, and referral URLs.
          </li>
          <li>
            Cookies or similar technologies used for core site functionality and
            performance.
          </li>
        </ul>
      </section>

      <section id="use">
        <h2 className="scroll-mt-24">How we use information</h2>
        <ul>
          <li>Respond to inquiries and schedule consultations.</li>
          <li>Provide requested information about services and specialties.</li>
          <li>Operate, maintain, and improve the website experience.</li>
          <li>
            Send newsletters or updates you request (you can unsubscribe at any
            time).
          </li>
          <li>Protect against fraud, abuse, and security incidents.</li>
          <li>Comply with legal obligations and enforce our terms.</li>
        </ul>
      </section>

      <section id="hipaa">
        <h2 className="scroll-mt-24">HIPAA and protected health information (PHI)</h2>
        <p>
          We support healthcare organizations and may handle PHI in the course
          of providing contracted services. Website inquiries are intended for
          business communications and should not include patient medical
          details. If you are a covered entity or business associate and need to
          transmit PHI, please use approved secure channels.
        </p>
      </section>

      <section id="sms">
        <h2 className="scroll-mt-24">Text messaging (if applicable)</h2>
        <p>
          If you provide a phone number, we may contact you by phone or text to
          respond to your request. Standard message and data rates may apply.
          Reply <strong>STOP</strong> to opt out of texts and{" "}
          <strong>HELP</strong> for assistance.
        </p>
      </section>

      <section id="share">
        <h2 className="scroll-mt-24">How we share information</h2>
        <ul>
          <li>
            <strong>Service providers:</strong> Vendors that help us operate the
            site and process requests (for example, hosting, forms, or email
            delivery), subject to contractual confidentiality where applicable.
          </li>
          <li>
            <strong>Legal and safety:</strong> If required to comply with law,
            protect rights, prevent fraud, or respond to lawful requests.
          </li>
          <li>
            <strong>Business transfers:</strong> If we are involved in a merger,
            acquisition, or asset sale, information may be transferred as part
            of that transaction.
          </li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>

      <section id="cookies">
        <h2 className="scroll-mt-24">Cookies</h2>
        <p>
          Cookies help websites function and can improve performance. You can
          control cookies through your browser settings. Some site features may
          not work properly if cookies are disabled. See our Cookie Policy for
          more details.
        </p>
      </section>

      <section id="security">
        <h2 className="scroll-mt-24">Security and retention</h2>
        <p>
          We use reasonable administrative, technical, and physical safeguards
          to protect information. No website can guarantee absolute security. We
          retain information as needed to respond to requests, provide services,
          comply with legal obligations, and resolve disputes.
        </p>
      </section>

      <section id="choices">
        <h2 className="scroll-mt-24">Your choices</h2>
        <ul>
          <li>
            <strong>Marketing emails:</strong> Unsubscribe using the link in our
            emails.
          </li>
          <li>
            <strong>Cookies:</strong> Control via browser settings.
          </li>
          <li>
            <strong>Access/updates:</strong> Contact us to request access,
            correction, or deletion where applicable.
          </li>
        </ul>
      </section>

      <section id="children">
        <h2 className="scroll-mt-24">Children&apos;s privacy</h2>
        <p>
          Our website is not directed to children under 13, and we do not
          knowingly collect personal information from children.
        </p>
      </section>

      <section id="changes">
        <h2 className="scroll-mt-24">Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the
          updated version on this page with a revised effective date.
        </p>
      </section>

      <section id="contact">
        <h2 className="scroll-mt-24">Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a href={`mailto:${business.contact.email}`}>
            {business.contact.email}
          </a>
          .
        </p>
        <div className="not-prose mt-4 rounded-2xl border border-border/60 bg-background/70 p-6">
          <p className="text-sm font-semibold">{business.legalName}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {business.addresses?.[0]?.line1}
            <br />
            {business.addresses?.[0]?.city}, {business.addresses?.[0]?.state}{" "}
            {business.addresses?.[0]?.postalCode}
          </p>
        </div>
      </section>
    </>
  );
}
