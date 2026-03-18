import { getCachedBusinessProfile } from "@/lib/business-profile";
import { LegalTopCards } from "@/components/legal/legal-top-cards";

export async function CookiePolicyContent() {
  const business = await getCachedBusinessProfile();

  return (
    <>
      <LegalTopCards
        items={[
          { label: "Effective date", value: "March 15, 2026" },
          { label: "Applies to", value: "Website cookies" },
          { label: "Control", value: "Browser settings" },
        ]}
      />

      <section id="intro">
        <h2 className="scroll-mt-24">Overview</h2>
        <p>
          This Cookie Policy explains how <strong>{business.legalName}</strong>{" "}
          (&quot;MI MedCare&quot;, &quot;we&quot;, &quot;us&quot;) uses cookies
          and similar technologies on our website.
        </p>
      </section>

      <section id="what">
        <h2 className="scroll-mt-24">What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. Cookies help sites work, remember preferences, and understand
          how visitors interact with pages.
        </p>
      </section>

      <section id="types">
        <h2 className="scroll-mt-24">Types of cookies we may use</h2>
        <ul>
          <li>
            <strong>Essential cookies:</strong> Required for core site
            functionality and security.
          </li>
          <li>
            <strong>Functional cookies:</strong> Remember choices (for example,
            theme preferences) to improve your experience.
          </li>
          <li>
            <strong>Performance/analytics cookies:</strong> Help us understand
            site usage and improve performance. These may be enabled now or in
            the future as we evolve the Site.
          </li>
        </ul>
      </section>

      <section id="manage">
        <h2 className="scroll-mt-24">How to manage cookies</h2>
        <p>
          You can manage cookies through your browser settings. Most browsers
          let you remove or reject cookies. If you disable cookies, some
          features may not function properly.
        </p>
      </section>

      <section id="dnt">
        <h2 className="scroll-mt-24">Do Not Track</h2>
        <p>
          Some browsers send a &quot;Do Not Track&quot; signal. Because there is
          no uniform standard for interpreting these signals, we do not
          currently respond to them.
        </p>
      </section>

      <section id="contact">
        <h2 className="scroll-mt-24">Contact</h2>
        <p>
          Questions about this Cookie Policy? Contact us at{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a>.
        </p>
      </section>
    </>
  );
}
