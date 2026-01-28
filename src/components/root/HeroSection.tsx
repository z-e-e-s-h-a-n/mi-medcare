import { Clock9, HeartPulse, PhoneCall, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import IconWrapper from "./IconWrapper";
import { testimonials } from "@constants/content";
import { contactDetails } from "@constants/app";
import { cn } from "@utils/general";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between relative min-h-[120vh] bg-[url(/images/hero-bg.webp)] bg-top bg-no-repeat bg-cover [&>div]:basis-1/2 [&>div]:relative">
      <div className="pt-16 space-y-6 z-10">
        <h1 className="text-4xl md:text-5xl font-medium leading-[1.4] tracking-tight">
          Revenue Cycle Management Services
        </h1>
        <p>
          Every claim, every payment, and every report handled with clarity and
          precision. Our smart automation and expert oversight ensure your
          revenue cycle never skips a beat.
        </p>
        <div className="space-x-4">
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
        <div className="flex items-center gap-4 [&_svg]:size-8 [&_svg]:text-primary [&>div]:space-y-2 [&>div]:mt-4 [&>div>div]:flex [&>div>div]:items-center [&>div>div]:gap-4 [&>div>div]:text-xl font-medium">
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
      <div className="relative [&>div]:absolute [&>div]:p-4 [&>div]:rounded-2xl">
        <Image
          src="/images/hero-right.webp"
          alt="Hero Image"
          width={1000}
          height={1000}
          className=" w-[80%] float-right"
        />
        <div className="gap-2 text-lg bg-white max-lg:bottom-[5%] lg:bottom-1/5 max-md:right-4 md:left-4 space-y-4">
          <div className="flex items-center">
            <IconWrapper size="sm">
              <Star />
            </IconWrapper>
            <span>4.9 Clients Rating</span>
          </div>
          <ul className="flex items-center">
            {testimonials.map((t) => (
              <li
                key={t.title}
                className={cn(
                  "size-10 overflow-hidden bg-primary/20 rounded-full shadow-2xl border border-black not-first:-ml-2",
                )}
              >
                <Image
                  src={t.imageUrl}
                  alt={t.title}
                  width={48}
                  height={48}
                  className="object-top size-full rounded-full"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="gap-2 text-lg bg-primary/90 max-lg:bottom-[44%] md:bottom-1/3 max-md:left-4 md:right-4 text-primary-foreground max-w-xs">
          <div className="font-medium flex items-center gap-4">
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
