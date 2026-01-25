import { cn } from "../../lib/utils/general";
import React from "react";

interface OverlayCardProps {
  title?: string;
  desc?: string;
  className?: string;
}

const OverlayCard = ({ title, desc, className }: OverlayCardProps) => {
  return (
    <div
      className={cn(
        "p-4 md:p-8 rounded-2xl bg-black w-50 md:w-60 text-white text-center space-y-2  absolute -bottom-[2%] -left-[3%] z-10",
        className,
      )}
    >
      <span className="text-4xl font-medium"> {title}</span>
      <span>{desc}</span>
    </div>
  );
};

export default OverlayCard;
