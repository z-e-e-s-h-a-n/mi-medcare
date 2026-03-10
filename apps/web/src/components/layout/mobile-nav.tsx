"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { Menu, ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import { business, HEADER_NAVIGATION } from "@/lib/constants";
import { formatBusinessAddress } from "@/lib/utils";

interface MobileNavProps {
  onBookConsultation?: () => void;
}

export function MobileNav({ onBookConsultation }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const headOfficeAddress = business.addresses?.[0];
  const branchAddresses = business.addresses?.slice(1) ?? [];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col h-full">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        {/* Contact Info in Mobile Menu */}
        <div className="p-6 border-b bg-muted/50">
          <div className="space-y-3">
            <motion.a
              whileHover={{ x: 5 }}
              href={`tel:${business.phone}`}
              className="flex items-center gap-2 text-sm hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              {business.phone}
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href={`mailto:${business.email}`}
              className="flex items-center gap-2 text-sm hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" />
              {business.email}
            </motion.a>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start gap-2 text-sm"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <div className="text-muted-foreground text-sm">
                {headOfficeAddress ? (
                  <>
                    <span className="font-semibold text-foreground">
                      {headOfficeAddress.label ?? "Head Office"}:
                    </span>{" "}
                    {formatBusinessAddress(headOfficeAddress)}
                  </>
                ) : (
                  "Multiple Locations"
                )}
                {branchAddresses.length > 0 ? (
                  <div className="mt-1 space-y-1 text-xs">
                    <span className="block font-semibold text-foreground">
                      Branches
                    </span>
                    {branchAddresses.map((address) => (
                      <span key={address.line1} className="block">
                        {address.label ? `${address.label}: ` : ""}
                        {formatBusinessAddress(address)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-6">
          <nav className="space-y-2">
            {HEADER_NAVIGATION.map((item) => (
              <div key={item.title}>
                <Collapsible
                  open={openSections.includes(item.title)}
                  onOpenChange={() => toggleSection(item.title)}
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-sm font-medium hover:text-primary transition-colors">
                    {item.title}
                    <motion.div
                      animate={{
                        rotate: openSections.includes(item.title) ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-2 space-y-3 border-l-2 border-primary/20 pl-4"
                    >
                      {item.children.map((child) => (
                        <motion.div
                          key={child.title}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={child.href || "#"}
                            onClick={() => setOpen(false)}
                            className="flex flex-col py-2 group"
                          >
                            <span className="text-sm font-medium group-hover:text-primary">
                              {child.title}
                            </span>
                            {child.description && (
                              <span className="text-xs text-muted-foreground">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      ))}

                      {/* Featured Item if exists */}
                      {item.featured && (
                        <motion.div
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-4 pt-4 border-t"
                        >
                          <Link
                            href={item.featured.href}
                            onClick={() => setOpen(false)}
                            className="flex flex-col"
                          >
                            <span className="text-sm font-semibold text-primary">
                              {item.featured.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.featured.description}
                            </span>
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </nav>
        </div>

        {/* CTA Buttons */}
        <div className="shrink-0 p-6 border-t bg-background">
          <div className="space-y-3">
            <Button href="/contact" variant="outline" className="w-full">
              Contact
            </Button>

            <Button
              className="w-full bg-linear-to-r from-primary to-secondary"
              onClick={() => {
                setOpen(false);
                onBookConsultation?.();
              }}
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
