import { EHRsList } from "@constants/content";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils/general";

interface EHRsSectionProps {
  title: string;
  desc: string;
  length?: number;
  className?: string;
}

const EHRsSection = ({ title, desc, length, className }: EHRsSectionProps) => {
  return (
    <section className={cn("space-y-6 text-center", className)}>
      <h2>{title}</h2>
      <p>{desc}</p>

      <ul className="flex flex-wrap gap-8">
        {(length ? EHRsList.slice(0, length) : EHRsList).map((_, i) => (
          <li
            key={i}
            className="border-2 border-primary bg-background p-5  rounded-2xl basis-full sm:basis-[calc(50%-32px)] md:basis-[calc(33.3%-32px)]"
          >
            <Image
              src={`/images/ehrs/ehrs-${i + 1}.jpg`}
              alt="EHRs Image"
              width={200}
              height={200}
              className="h-[68px] bg-transparent"
            />
          </li>
        ))}
      </ul>
      {length && (
        <Button href="/ehr-partners" size="lg">
          Explore More
        </Button>
      )}
    </section>
  );
};

export default EHRsSection;
