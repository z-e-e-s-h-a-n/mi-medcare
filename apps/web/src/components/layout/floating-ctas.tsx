import { IconCalendar } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { BOOKING_LINK } from "@/lib/constants";

export function FloatingCtas() {
  return (
    <div className="fixed bottom-5 right-5 z-12 flex flex-col items-end gap-3">
      <Button
        variant="gradient"
        className="h-11 rounded-full px-4 shadow-lg lg:hidden"
        pulseDelay={4000}
        href={BOOKING_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconCalendar className="size-5" />
        <span className="hidden sm:inline">Schedule a Call</span>
      </Button>

      <WhatsAppFab />
    </div>
  );
}
