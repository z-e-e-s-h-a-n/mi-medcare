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
      className="parallax-section"
      style={
        {
          "--bg-image": `url(/images/${bgImage}-parallax-bg.webp)`,
          "--text-align": position,
          "--justify-content":
            position === "left"
              ? "start"
              : position === "right"
                ? "end"
                : "center",
        } as React.CSSProperties
      }
    >
      <div>
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
