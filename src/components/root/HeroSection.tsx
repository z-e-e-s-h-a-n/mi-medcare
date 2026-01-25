import { Clock9, HeartPulse, PhoneCall, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import IconWrapper from "./IconWrapper";
import { testimonials } from "@constants/content";
import { contactDetails } from "@constants/app";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div>
        <h1>Revenue Cycle Management Services</h1>
        <p>
          Every claim, every payment, and every report handled with clarity and
          precision. Our smart automation and expert oversight ensure your
          revenue cycle never skips a beat.
        </p>
        <div>
          <Button size="lg" href="#contact-section">
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            href={`tel:${contactDetails.phone}`}
          >
            <PhoneCall /> <span>{contactDetails.phone}</span>
          </Button>
        </div>
        <div>
          <div>
            <div>
              <HeartPulse /> <span>Accurate Claims</span>
            </div>
            <p>Clean claim submissions and faster reimbursements every time</p>
          </div>
          <div>
            <div>
              <Clock9 />
              <span>Improved Reimbursement</span>
            </div>
            <p>
              Providing enhanced reimbursement for the services delivered by us.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/hero-right.webp"
          alt="Hero Image"
          width={1000}
          height={1000}
        />
        <div>
          <div>
            <IconWrapper size="sm">
              <Star />
            </IconWrapper>
            <span>4.9 Clients Rating</span>
          </div>
          <ul>
            {testimonials.map((t) => (
              <li key={t.title}>
                <Image src={t.imageUrl} alt={t.title} width={48} height={48} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>
            <IconWrapper size="md">
              <ThumbsUp />
            </IconWrapper>
            HIPAA Compliant Process
          </div>
          Secure, private and fully compliant handling.
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
