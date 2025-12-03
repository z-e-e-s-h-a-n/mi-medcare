import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ArrowBigRight } from "lucide-react";

const PromoPopup = () => {
  return (
    <Dialog defaultOpen={true}>
      <DialogTrigger className="sr-only">Promo Message</DialogTrigger>
      <DialogContent className="space-y-6 p-8 bg-secondary/95 max-w-xs!">
        <DialogHeader className="space-y-6 text-center!">
          <DialogTitle className="text-3xl">
            Are you looking for a free audit of your practice?
          </DialogTitle>
          <DialogDescription>
            Get a clear picture of where your practice stands. Book a free,
            no-cost audit and uncover how well your billing is really
            performing.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center!">
          <Button>
            <ArrowBigRight className="mr-2" />
            Get Free Audit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;
