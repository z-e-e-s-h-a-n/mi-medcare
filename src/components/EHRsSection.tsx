import { EHRsList } from "@/lib/constants";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface EHRsSectionProps {
  title: string;
  desc: string;
  length?: number;
  className?: string;
}

const EHRsSection = ({ title, desc, length, className }: EHRsSectionProps) => {
  return (
    <section className={cn("ehrs-section", className)}>
      <h2>{title}</h2>
      <p>{desc}</p>

      <ul>
        {(length ? EHRsList.slice(0, length) : EHRsList).map((_, i) => (
          <li key={i}>
            <Image
              src={`/images/ehrs/ehrs-${i + 1}.jpg`}
              alt="EHRs Image"
              width={200}
              height={200}
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
