import type { ReactNode } from "react";

import { cn } from "@workspace/ui/lib/utils";

type LegalProseProps = {
  children: ReactNode;
  className?: string;
};

export function LegalProse({ children, className }: LegalProseProps) {
  return (
    <div className={cn("mx-auto max-w-4xl", className)}>
      <div
        className={cn(
          "space-y-10 text-base leading-7 text-muted-foreground",
          "[&>section]:space-y-4",
          "[&>section+section]:pt-2",
          "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground",
          "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
          "[&_p]:leading-relaxed",
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2",
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2",
          "[&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline",
          "[&_strong]:text-primary [&_strong]:font-semibold",
          "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-foreground",
        )}
      >
        {children}
      </div>
    </div>
  );
}
