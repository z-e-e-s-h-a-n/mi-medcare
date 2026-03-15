import { cn } from "@workspace/ui/lib/utils";

export type LegalTocItem = {
  id: string;
  label: string;
};

type LegalTocProps = {
  items: LegalTocItem[];
  className?: string;
};

export function LegalToc({ items, className }: LegalTocProps) {
  if (!items.length) return null;

  return (
    <nav className={cn("grid gap-1.5 text-sm", className)} aria-label="On this page">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-background/60 transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

