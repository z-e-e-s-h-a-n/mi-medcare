import { BadgeCheck, Hospital, ThumbsUp, User } from "lucide-react";
import React from "react";
import IconWrapper from "./IconWrapper";

const ExperienceSection = () => {
  return (
    <section className="experience-section">
      <div>
        <div>
          <IconWrapper>
            <BadgeCheck />
          </IconWrapper>
          <div>
            <span>7+</span>
            <span>Years of Experience</span>
          </div>
        </div>
        <p>
          7+ years of experience simplifying billing and maximizing revenue.
        </p>
      </div>
      <div>
        <div>
          <IconWrapper>
            <Hospital />
          </IconWrapper>
          <div>
            <span>247+</span>
            <span>Healthcare Clients</span>
          </div>
        </div>
        <p>Trusted by clinics and hospitals for accuracy and results.</p>
      </div>
      <div>
        <div>
          <IconWrapper>
            <User />
          </IconWrapper>
          <div>
            <span>13+</span>
            <span>Certified Billing Experts</span>
          </div>
        </div>
        <p>Billing Experts Ensuring compliance and faster payments.</p>
      </div>
      <div>
        <div>
          <IconWrapper>
            <ThumbsUp />
          </IconWrapper>
          <div>
            <span>99%</span>
            <span>Clean Claim Accuracy</span>
          </div>
        </div>
        <p>Partner Clinics Relying on our complete RCM support.</p>
      </div>
    </section>
  );
};

export default ExperienceSection;
