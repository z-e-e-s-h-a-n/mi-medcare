import Image from "next/image";
import React from "react";
import OverlayCard from "./OverlayCard";

const WelcomeSection = () => {
  return (
    <section className="space-y-16 pb-16">
      <div className="text-center space-y-4  font-medium">
        <span className="subtitle">Welcome To Mi MedCare LLC</span>
        <h2>Transparent Medical Billing Faster Claims, Clearer Payments</h2>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-8 [&>div]:basis-1/2">
        <div className="p-6 relative">
          <Image
            src="/images/welcome-left.webp"
            alt="Medical Billing Image"
            width={540}
            height={360}
            className="rounded-2xl"
          />
          <OverlayCard title="+200" desc="Consultations each month" />
        </div>
        <div className="space-y-4 mt-8 md:mt-0">
          <h3 className="text-2xl font-medium">
            Secure, compliant billing we handle claims and denials so you can
            focus on care.
          </h3>
          <p>
            We handle claims, patient statements, and denials so clinics can
            focus on care. Secure, compliant billing services built for
            hospitals, clinics, and telemedicine.
          </p>
          <ul className="dot-list space-y-2">
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
