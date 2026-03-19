import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { WhatsAppIcon } from "@/components/icons/social-icons";
import { useBusinessProfile } from "@/hooks/business";

type WhatsAppFabProps = {
  className?: string;
};

export function WhatsAppFab({ className }: WhatsAppFabProps) {
  const { data: business } = useBusinessProfile();
  const href = `https://wa.me/${business.whatsapp.value.replace(/\D/g, "")}`;

  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      pulseDelay={4000}
      className={cn(
        "h-12 rounded-full bg-[#13763A] px-5 font-semibold text-white [--pulse-color:#13763A] shadow-lg hover:bg-[#0F6330] focus-visible:ring-[#13763A]/30",
        className,
      )}
    >
      <WhatsAppIcon className="size-5 text-white" />
      <span>WhatsApp</span>
    </Button>
  );
}
