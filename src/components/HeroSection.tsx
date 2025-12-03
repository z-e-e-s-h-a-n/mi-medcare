import { Clock9, HeartPulse, PhoneCall, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import IconWrapper from "./IconWrapper";

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
          <Button size="lg" href="#">
            Get Started
          </Button>
          <Button size="lg" variant="outline" href="tel:+1916-252-1833">
            <PhoneCall /> <span>+1 916-252-1833</span>
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
              <span>Accurate Claims</span>
            </div>
            <p>
              Dedicated billing experts available day and night to help your
              team.
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
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
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
