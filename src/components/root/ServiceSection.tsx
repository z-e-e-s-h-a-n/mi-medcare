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
    <section className="py-24 bg-secondary space-y-8">
      <div className="text-center space-y-4">
        <span className="subtitle">What We Offer</span>
        <div>
          <h2>Personalized Healthcare Solutions for Every Stage of Life</h2>
        </div>
      </div>
      <ul className="flex justify-between flex-wrap gap-4">
        {services.map((s) => (
          <li
            key={s.title}
            className="group relative basis-full sm:basis-[calc(50%-16px)] lg:basis-[calc(33.3%-16px)] p-8 bg-card rounded-2xl text-center space-y-2 border-2 border-primary hover:bg-primary/90 hover:text-primary-foreground"
          >
            <IconWrapper className="mx-auto">{<s.icon />}</IconWrapper>
            <h4 className="text-xl font-medium">{s.title}</h4>
            <p>{s.desc}</p>
            <Link
              href={s.href}
              className="flex-center-inline gap-1 text-primary group-hover:text-primary-foreground before:absolute before:content-[''] before:inset-0"
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
