import { BadgeCheck, Hospital, ThumbsUp, User } from "lucide-react";
import React from "react";
import IconWrapper from "./IconWrapper";

const ExperienceSection = () => {
  return (
    <section className="relative flex items-center flex-wrap gap-8 lg:gap-4 py-12 px-9 bg-primary text-primary-foreground max-w-[96%] rounded-2xl lg:-mt-40 z-10">
      <div className="space-y-4 basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(25%-16px)]">
        <div className="flex items-center gap-4 text-lg font-medium">
          <IconWrapper>
            <BadgeCheck />
          </IconWrapper>
          <div className="flex flex-col">
            <span className="text-4xl text-outline-secondary">7+</span>
            <span>Years of Experience</span>
          </div>
        </div>
        <p>
          7+ years of experience simplifying billing and maximizing revenue.
        </p>
      </div>
      <div className="space-y-4 basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(25%-16px)]">
        <div className="flex items-center gap-4 text-lg font-medium">
          <IconWrapper>
            <Hospital />
          </IconWrapper>
          <div className="flex flex-col">
            <span className="text-4xl text-outline-secondary"> 247+</span>
            <span>Healthcare Clients</span>
          </div>
        </div>
        <p>Trusted by clinics and hospitals for accuracy and results.</p>
      </div>
      <div className="space-y-4 basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(25%-16px)]">
        <div className="flex items-center gap-4 text-lg font-medium">
          <IconWrapper>
            <User />
          </IconWrapper>
          <div className="flex flex-col">
            <span className="text-4xl text-outline-secondary">13+</span>
            <span>Certified Billing Experts</span>
          </div>
        </div>
        <p>Billing Experts Ensuring compliance and faster payments.</p>
      </div>
      <div className="space-y-4 basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(25%-16px)]">
        <div className="flex items-center gap-4 text-lg font-medium">
          <IconWrapper>
            <ThumbsUp />
          </IconWrapper>
          <div className="flex flex-col">
            <span className="text-4xl text-outline-secondary">99%</span>
            <span>Clean Claim Accuracy</span>
          </div>
        </div>
        <p>Partner Clinics Relying on our complete RCM support.</p>
      </div>
    </section>
  );
};

export default ExperienceSection;
