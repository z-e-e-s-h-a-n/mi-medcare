import { getCachedBusinessProfile } from "@/lib/business-profile";
import { LegalTopCards } from "@/components/legal/legal-top-cards";

export async function PrivacyPolicyContent() {
  const business = await getCachedBusinessProfile();

  return (
    <>
      <LegalTopCards
        items={[
          { label: "Last updated", value: "March 2026" },
          { label: "Applies to", value: "Website + inquiries" },
          { label: "SMS", value: "STOP / HELP supported" },
        ]}
      />

      <section id="intro">
        <h2 className="scroll-mt-24">1. Introduction</h2>
        <p>
          <strong>{business.legalName}</strong> respects your privacy and is
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and safeguard your information when you
          visit our website or interact with our services. By using this
          website, you consent to the practices described in this policy.
        </p>
      </section>

      <section id="collect">
        <h2 className="scroll-mt-24">2. Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Business or clinic name</li>
          <li>Information submitted through contact forms</li>
        </ul>
        <h3>Automatically Collected Information</h3>
        <p>When visiting our website we may collect:</p>
        <ul>
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Pages visited</li>
          <li>Date and time of access</li>
        </ul>
      </section>

      <section id="use">
        <h2 className="scroll-mt-24">3. How We Use Your Information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Respond to inquiries and consultation requests</li>
          <li>Provide medical billing and revenue cycle management services</li>
          <li>Improve website functionality</li>
          <li>Send service updates or customer support messages</li>
          <li>Communicate with users who request information</li>
        </ul>
      </section>

      <section id="sms">
        <h2 className="scroll-mt-24">4. SMS Communication &amp; Consent</h2>
        <p>
          By providing your phone number through our website forms, you consent
          to receive SMS messages from <strong>{business.legalName}</strong>{" "}
          related to:
        </p>
        <ul>
          <li>Appointment confirmations</li>
          <li>Customer support responses</li>
          <li>Service updates</li>
          <li>Business communication regarding our services</li>
        </ul>
        <p>
          Message frequency may vary. Message and data rates may apply. You can
          opt out of SMS communications at any time by replying{" "}
          <strong>STOP</strong> to unsubscribe. Reply <strong>HELP</strong> for
          assistance.
        </p>
        <p>
          We will never sell, rent, or share your phone number with third
          parties for marketing purposes.
        </p>
      </section>

      <section id="share">
        <h2 className="scroll-mt-24">5. Information Sharing</h2>
        <p>We do not sell or rent personal information.</p>
        <p>We may share information only with:</p>
        <ul>
          <li>Trusted service providers assisting in business operations</li>
          <li>Legal authorities when required by law</li>
        </ul>
      </section>

      <section id="security">
        <h2 className="scroll-mt-24">6. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect personal
          information from unauthorized access, alteration, disclosure, or
          destruction.
        </p>
      </section>

      <section id="cookies">
        <h2 className="scroll-mt-24">7. Cookies</h2>
        <p>
          Our website may use cookies to improve user experience and analyze
          website traffic. You may disable cookies in your browser settings if
          preferred.
        </p>
      </section>

      <section id="third-party">
        <h2 className="scroll-mt-24">8. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for their privacy practices.
        </p>
      </section>

      <section id="updates">
        <h2 className="scroll-mt-24">9. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Updates will be posted
          on this page with the revised date.
        </p>
      </section>

      <section id="contact">
        <h2 className="scroll-mt-24">10. Contact Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy, contact:
          <br />
          <strong>{business.legalName}</strong>
          <br />
          Email: <a href={`mailto:${business.email}`}>{business.email}</a>
        </p>
      </section>
    </>
  );
}
