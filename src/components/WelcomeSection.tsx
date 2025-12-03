import Image from "next/image";
import React from "react";
import OverlayCard from "./OverlayCard";

const WelcomeSection = () => {
  return (
    <section className="welcome-section">
      <div>
        <span>Welcome To Mi MedCare LLC</span>
        <h2>Transparent Medical Billing Faster Claims, Clearer Payments</h2>
      </div>
      <div>
        <div>
          <Image
            src="/images/welcome-left.webp"
            alt="Medical Billing Image"
            width={540}
            height={360}
          />
          <OverlayCard title="+200" desc="Consultations each month" />
        </div>
        <div>
          <h3>
            Secure, compliant billing we handle claims and denials so you can
            focus on care.
          </h3>
          <p>
            We handle claims, patient statements, and denials so clinics can
            focus on care. Secure, compliant billing services built for
            hospitals, clinics, and telemedicine.
          </p>
          <ul>
            <li>End-to-end claims submission & follow-up</li>
            <li>Denial management & appeals to maximize reimbursements</li>
            <li>Patient billing portal with clear invoices & payment plans</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
