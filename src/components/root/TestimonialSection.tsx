import Image from "next/image";
import React from "react";
import IconWrapper from "./IconWrapper";
import { Quote } from "lucide-react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@constants/content";

const TestimonialSection = () => {
  return (
    <section className="space-y-4 text-center mb-16">
      <span className="subtitle">Testimonials</span>
      <h2>Dr. Experiences That Speak for Themselves</h2>

      <div className="flex-col lg:flex-row flex items-center justify-between gap-16 mt-10">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/testimonial-left.webp"
            alt="Testimonials Image"
            width={600}
            height={600}
            className="rounded-2xl"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-8 text-start">
          <IconWrapper className="ml-auto text-end">
            <Quote />
          </IconWrapper>

          <Carousel>
            <CarouselPrevious className="relative mb-4" />
            <CarouselNext className="relative mb-4" />
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="space-y-8 max-w-full">
                  <div className="flex items-center gap-4">
                    <Image
                      src={t.imageUrl}
                      alt={t.name}
                      width={60}
                      height={60}
                      className="size-[60px] rounded-full object-top"
                    />
                    <div>
                      <h5 className="text-lg font-medium">{t.name}</h5>
                      <span className="subtitle">{t.title}</span>
                    </div>
                  </div>
                  <p>{t.desc}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Button href="#" size="lg">
            View More Testimonials
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
