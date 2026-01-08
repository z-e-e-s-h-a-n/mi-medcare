import React from "react";
import Link from "next/link";
import {
  Album,
  ArrowRight,
  ChartNoAxesCombined,
  House,
  MessageCircleMore,
  Monitor,
  Trophy,
} from "lucide-react";
import IconWrapper from "./IconWrapper";

const ServiceSection = () => {
  const services = [
    {
      icon: Trophy,
      title: "Billing & Coding",
      desc: "Medical Billing & Coding ensures accurate claims and timely reimbursements.",
      href: "",
    },
    {
      icon: House,
      title: "Provider Enrolment",
      desc: "Credentialing & Provider Enrollment links providers with insurance networks.",
      href: "",
    },
    {
      icon: Album,
      title: "Accounts Receivable (A/R)",
      desc: "A/R Management tracks and recovers pending payments efficiently.",
      href: "",
    },
    {
      icon: MessageCircleMore,
      title: "Patient Billing Support",
      desc: "Patient Billing Support ensures clear statements and smooth payment experiences.",
      href: "",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Reporting & Analytics",
      desc: "Reporting & Analytics delivers real-time insights to optimize revenue.",
      href: "",
    },
    {
      icon: Monitor,
      title: "Front Desk Management",
      desc: "Virtual medical assistant, ensuring smooth patient flow and efficient daily operations.",
      href: "",
    },
  ];

  return (
    <section className="service-section">
      <div>
        <span>What We Offer</span>
        <div>
          <h2>Personalized Healthcare Solutions for Every Stage of Life</h2>
        </div>
      </div>
      <ul>
        {services.map((s) => (
          <li key={s.title}>
            <IconWrapper className="mx-auto">{<s.icon />}</IconWrapper>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
            <Link
              href={s.href}
              className="service-link"
              aria-label={`Learn more about ${s.title}`}
            >
              <span>Learn more</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServiceSection;
