import { cn } from "../../lib/utils/general";
import React from "react";

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

const IconWrapper = ({
  children,
  className,
  variant = "secondary",
  size = "lg",
}: IconWrapperProps) => {
  return (
    <div
      className={cn(
        "flex-center rounded-full",
        className,
        size === "sm"
          ? "size-8 [&_svg]:size-4"
          : size === "md"
            ? "size-12 [&_svg]:size-6"
            : "size-16 [&_svg]:size-8",

        variant === "primary"
          ? "bg-primary text-secondary"
          : "bg-secondary text-primary dark:bg-muted",
      )}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
