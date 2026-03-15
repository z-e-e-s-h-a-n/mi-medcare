import { business } from "@/lib/constants";
import { LegalTopCards } from "@/components/legal/legal-top-cards";

export function TermsContent() {
  return (
    <>
      <LegalTopCards
        items={[
          { label: "Last updated", value: "March 2026" },
          { label: "Applies to", value: "Website use" },
          { label: "SMS", value: "STOP / HELP supported" },
        ]}
      />

      <section id="intro">
        <h2 className="scroll-mt-24">1. Agreement to Terms</h2>
        <p>
          By accessing or using the <strong>{business.legalName}</strong>{" "}
          website, you agree to comply with these Terms and Conditions. If you
          do not agree with these terms, please discontinue use of the website.
        </p>
      </section>

      <section id="services">
        <h2 className="scroll-mt-24">2. Description of Services</h2>
        <p>
          <strong>{business.legalName}</strong> provides professional services
          including:
        </p>
        <ul>
          <li>Medical Billing</li>
          <li>Revenue Cycle Management</li>
          <li>Credentialing &amp; Provider Enrollment</li>
          <li>Accounts Receivable Management</li>
          <li>Patient Billing Support</li>
        </ul>
        <p>Service details may vary depending on agreements with clients.</p>
      </section>

      <section id="sms">
        <h2 className="scroll-mt-24">3. SMS Messaging Program</h2>
        <p>
          By submitting your phone number through our website, you agree to
          receive SMS communications from <strong>{business.legalName}</strong>.
        </p>
        <p>Types of messages may include:</p>
        <ul>
          <li>Appointment confirmations</li>
          <li>Customer support responses</li>
          <li>Service notifications</li>
          <li>Business communication related to our services</li>
        </ul>
        <p>
          Message frequency may vary. Message and data rates may apply. You may
          opt out at any time by replying <strong>STOP</strong>. Reply{" "}
          <strong>HELP</strong> for assistance.
        </p>
      </section>

      <section id="responsibilities">
        <h2 className="scroll-mt-24">4. User Responsibilities</h2>
        <ul>
          <li>Use the website for illegal purposes</li>
          <li>Attempt unauthorized access to our systems</li>
          <li>Interfere with website security</li>
        </ul>
      </section>

      <section id="ip">
        <h2 className="scroll-mt-24">5. Intellectual Property</h2>
        <p>
          All content on this website including text, graphics, logos, and
          design belongs to <strong>{business.legalName}</strong> and is
          protected by intellectual property laws. Unauthorized reproduction or
          distribution is prohibited.
        </p>
      </section>

      <section id="liability">
        <h2 className="scroll-mt-24">6. Limitation of Liability</h2>
        <p>
          <strong>{business.legalName}</strong> is not responsible for damages
          resulting from the use or inability to use this website.
        </p>
      </section>

      <section id="changes">
        <h2 className="scroll-mt-24">7. Modifications</h2>
        <p>
          We reserve the right to update these Terms at any time. Updated
          versions will be posted on this page.
        </p>
      </section>

      <section id="law">
        <h2 className="scroll-mt-24">8. Governing Law</h2>
        <p>
          These Terms shall be governed by the laws of the United States.
        </p>
      </section>

      <section id="contact">
        <h2 className="scroll-mt-24">9. Contact Information</h2>
        <p>
          <strong>{business.legalName}</strong>
          <br />
          Email:{" "}
          <a href={`mailto:${business.contact.email}`}>
            {business.contact.email}
          </a>
        </p>
      </section>
    </>
  );
}
