import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, HeartPulse, Stethoscope, User } from "lucide-react";
import { Button } from "../ui/button";

const SpecialtiesSection = () => {
  const specialties = [
    {
      icon: Stethoscope,
      title: "Anesthesia Billing Services",
      desc: "Comprehensive anesthesia billing solutions ensuring timely reimbursements.",
    },
    {
      icon: HeartPulse,
      title: "Cardiology Billing Services",
      desc: "Precise cardiology coding and claim submissions to maximize revenue.",
    },
    {
      icon: Heart,
      title: "Dentistry Billing Services",
      desc: "Compliant dental billing and insurance claim support for dental practices.",
    },
    {
      icon: User,
      title: "Family Medicine Billing Services",
      desc: "Reliable billing support for family practitioners with full transparency.",
    },
  ];

  return (
    <section className="specialties-section space-y-8 text-center">
      <h2>Our Specialties</h2>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {specialties.map((s, i) => (
            <CarouselItem
              key={i}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="flex flex-col items-center gap-2 h-full py-[30px] px-8 rounded-2xl shadow-sm border-2 border-primary">
                {<s.icon className="size-8 text-primary" />}
                <h4 className="text-lg font-medium">{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Button href="/specialties" size="lg">
        View All Specialties
      </Button>
    </section>
  );
};

export default SpecialtiesSection;
