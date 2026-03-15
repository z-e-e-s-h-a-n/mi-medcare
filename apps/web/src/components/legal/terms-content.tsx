import { business } from "@/lib/constants";
import { LegalTopCards } from "@/components/legal/legal-top-cards";

export function TermsContent() {
  return (
    <>
      <LegalTopCards
        items={[
          { label: "Effective date", value: "March 15, 2026" },
          { label: "Applies to", value: "Website use" },
          { label: "Reminder", value: "No PHI in forms" },
        ]}
      />

      <section id="intro">
        <h2 className="scroll-mt-24">Overview</h2>
        <p>
          These Terms and Conditions (&quot;Terms&quot;) govern your access to
          and use of the MI MedCare website and related online services (the
          &quot;Site&quot;). By using the Site, you agree to these Terms.
        </p>
      </section>

      <section id="who">
        <h2 className="scroll-mt-24">Who we are</h2>
        <p>
          The Site is operated by <strong>{business.legalName}</strong>.
        </p>
      </section>

      <section id="use">
        <h2 className="scroll-mt-24">Use of the Site</h2>
        <ul>
          <li>
            You may use the Site for lawful purposes and in accordance with
            these Terms.
          </li>
          <li>
            You agree not to attempt to disrupt the Site, probe vulnerabilities,
            or access non-public areas without authorization.
          </li>
          <li>
            You agree not to submit false information, impersonate others, or
            use the Site to transmit unlawful content.
          </li>
        </ul>
      </section>

      <section id="info">
        <h2 className="scroll-mt-24">Informational content; no medical advice</h2>
        <p>
          Content on the Site is provided for general informational purposes
          about revenue cycle management and billing operations. It is not
          medical advice, legal advice, or a substitute for professional
          guidance tailored to your organization.
        </p>
      </section>

      <section id="submissions">
        <h2 className="scroll-mt-24">Contact forms and submissions</h2>
        <p>
          When you submit information through the Site (for example, contact or
          consultation requests), you represent that the information is accurate
          and that you have the right to provide it. Please do not include
          patient medical records or sensitive PHI in website forms.
        </p>
      </section>

      <section id="third-party">
        <h2 className="scroll-mt-24">Third-party links</h2>
        <p>
          The Site may contain links to third-party sites. We do not control and
          are not responsible for third-party content, policies, or practices.
          Access third-party sites at your own risk.
        </p>
      </section>

      <section id="ip">
        <h2 className="scroll-mt-24">Intellectual property</h2>
        <p>
          The Site and its content, features, and design are owned by MI MedCare
          or its licensors and are protected by applicable intellectual property
          laws. You may not copy, modify, distribute, or create derivative works
          except as permitted by law or with our written permission.
        </p>
      </section>

      <section id="disclaimer">
        <h2 className="scroll-mt-24">Disclaimer of warranties</h2>
        <p>
          The Site is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
          basis. To the maximum extent permitted by law, we disclaim all
          warranties of any kind, whether express or implied, including
          warranties of merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
      </section>

      <section id="liability">
        <h2 className="scroll-mt-24">Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, MI MedCare and its affiliates,
          officers, employees, and agents will not be liable for indirect,
          incidental, consequential, special, or punitive damages, or any loss
          of profits or revenues, arising out of or related to your use of the
          Site.
        </p>
      </section>

      <section id="privacy">
        <h2 className="scroll-mt-24">Privacy</h2>
        <p>
          Our Privacy Policy explains how we handle personal information. By
          using the Site, you consent to our data practices as described in the
          Privacy Policy.
        </p>
      </section>

      <section id="changes">
        <h2 className="scroll-mt-24">Changes</h2>
        <p>
          We may update these Terms from time to time. Changes will be posted on
          this page with an updated effective date.
        </p>
      </section>

      <section id="contact">
        <h2 className="scroll-mt-24">Contact</h2>
        <p>
          Questions about these Terms? Contact us at{" "}
          <a href={`mailto:${business.contact.email}`}>
            {business.contact.email}
          </a>
          .
        </p>
      </section>
    </>
  );
}
