import type { ReactNode } from "react";

import { cn } from "@workspace/ui/lib/utils";

export type LegalTopCardItem = {
  label: string;
  value: ReactNode;
};

type LegalTopCardsProps = {
  items: LegalTopCardItem[];
  className?: string;
};

export function LegalTopCards({ items, className }: LegalTopCardsProps) {
  if (!items.length) return null;

  return (
    <div
      className={cn(
        "not-prose rounded-2xl border border-border/60 bg-muted/30 p-4",
        className,
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl bg-linear-to-br from-primary/10 to-accent/10 p-6"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-2 font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
