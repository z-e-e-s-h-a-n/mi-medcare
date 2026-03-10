import { IconBrandWhatsapp } from "@tabler/icons-react";
import { business } from "@/lib/constants";
import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

type WhatsAppFabProps = {
  className?: string;
};

export function WhatsAppFab({ className }: WhatsAppFabProps) {
  const href = `https://wa.me/${business.whatsapp}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className={cn(
        buttonVariants({ size: "default" }),
        "h-11 rounded-full bg-[#25D366] px-4 text-white shadow-lg hover:bg-[#20bd5a] focus-visible:ring-[#25D366]/30",
        className,
      )}
    >
      <IconBrandWhatsapp className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
