import { IconBrandWhatsapp } from "@tabler/icons-react";
import { business } from "@/lib/constants";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

type WhatsAppFabProps = {
  className?: string;
};

export function WhatsAppFab({ className }: WhatsAppFabProps) {
  const href = `https://wa.me/${business.whatsapp}`;

  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      pulseDelay={4000}
      className={cn(
        "h-11 rounded-full bg-[#1DA851] px-4 text-white [--pulse-color:#1DA851] shadow-lg hover:bg-[#20bd5a] focus-visible:ring-[#1DA851]/30",
        className,
      )}
    >
      <IconBrandWhatsapp className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Button>
  );
}
