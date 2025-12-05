"use client";

import { Button } from "./ui/button";
import { ArrowBigRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

const PromoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const popupShown = getCookie("promoPopupShown");

    if (!popupShown) {
      queueMicrotask(() => setOpen(true));

      setCookie("promoPopupShown", "yes", {
        maxAge: 60 * 60 * 24,
      });
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 h-screen"
        onClick={() => setOpen(false)}
      />

      <div
        className="
          fixed z-50
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-xs p-8 pb-16 space-y-8
          text-center rounded-md
          bg-secondary/95 shadow-xl
        "
      >
        <X className="absolute right-4 top-4 cursor-pointer" />

        <div className="space-y-6">
          <h4 className="text-3xl font-semibold">
            Are you looking for a free audit of your practice?
          </h4>
          <p className="text-sm text-muted-foreground">
            Get a clear picture of where your practice stands. Book a free,
            no-cost audit and uncover how well your billing is really
            performing.
          </p>
        </div>

        <div className="flex justify-center">
          <Button href="#contact-form" onClick={() => setOpen(false)}>
            <ArrowBigRight className="mr-2" />
            Get Free Audit
          </Button>
        </div>
      </div>
    </>
  );
};

export default PromoPopup;
