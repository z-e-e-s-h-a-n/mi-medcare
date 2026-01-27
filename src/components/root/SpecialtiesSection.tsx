import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { specialties } from "@constants/content";

const SpecialtiesSection = () => {
  return (
    <section className="specialties-section space-y-8 text-center">
      <h2>Our Specialties</h2>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {specialties.slice(0, 4).map((s, i) => (
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
