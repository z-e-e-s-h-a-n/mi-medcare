import React from "react";
import { Button } from "../ui/button";

interface ParallaxSectionProps {
  title: string;
  desc: string | React.ReactNode;
  href?: string;
  cta: string;
  bgImage: string;
  position?: "left" | "right" | "center";
}

const ParallaxSection = ({
  title,
  desc,
  cta,
  href,
  bgImage,
  position = "center",
}: ParallaxSectionProps) => {
  return (
    <section
      className="relative bg-center bg-no-repeat bg-cover bg-fixed min-h-[80svh]  md:min-h-svh flex items-center before:absolute before:inset-0 before:bg-black/40"
      style={{
        backgroundImage: `url(/images/${bgImage}-parallax-bg.webp)`,
        textAlign: position,
        justifyContent:
          position === "left"
            ? "start"
            : position === "right"
              ? "end"
              : "center",
      }}
    >
      <div className="relative text-primary-foreground w-lg space-y-4">
        <h2> {title}</h2>
        <p>{desc}</p>
        <Button href={href} variant="secondary" size="lg">
          {cta}
        </Button>
      </div>
    </section>
  );
};

export default ParallaxSection;
