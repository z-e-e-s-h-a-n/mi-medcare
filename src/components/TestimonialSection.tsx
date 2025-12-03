import Image from "next/image";
import React from "react";
import IconWrapper from "./IconWrapper";
import { Quote } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Dr. Emily Carter",
      title: "Family Practice",
      desc: "They simplified our billing completely. Clean claims, faster payments, and no more stress over denials",
      avatar: "/images/testimonial-1.webp",
    },
  ];

  return (
    <section className="testimonial-section mb-16">
      <span>Testimonials</span>
      <h2>Dr. Experiences That Speak for Themselves</h2>

      <div>
        <Image
          src="/images/testimonial-left.webp"
          alt="Testimonials Image"
          width={600}
          height={600}
        />

        <div>
          <IconWrapper>
            <Quote />
          </IconWrapper>

          <Carousel>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i}>
                  <div>
                    <Image src={t.avatar} alt={t.name} width={60} height={60} />
                    <div>
                      <h5>{t.name}</h5>
                      <span>{t.title}</span>
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
