"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
} from "@workspace/ui/components/carousel";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeader } from "@/components/layout/section-header";
import { cn } from "@workspace/ui/lib/utils";

interface TestimonialsSectionProps {
  className?: string;
}

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
    <section className={cn("section-container bg-muted", className)}>
      <SectionHeader
        badge="Testimonials"
        title="What Our Clients Say"
        description="Join hundreds of satisfied healthcare providers"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative"
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          autoplay={{
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-background rounded-2xl p-6 border hover:shadow-xl transition-all h-full"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 line-clamp-4">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/10 shrink-0">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-primary truncate">
                        {testimonial.practice}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-background border shadow-lg hover:bg-primary hover:text-white transition-colors" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-background border shadow-lg hover:bg-primary hover:text-white transition-colors" />

          {/* Indicators */}
          <CarouselIndicators className="mt-8" />
        </Carousel>
      </motion.div>
    </section>
  );
}
