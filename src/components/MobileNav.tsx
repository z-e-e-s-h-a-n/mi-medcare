"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainMenu } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, TextAlignEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const ToggleSubMenu = (hasSub: boolean) => setOpen(hasSub ? !open : false);

  return (
    <nav className={cn("navigation", className)}>
      {mainMenu.slice(0, 5).map(({ title, href, subMenu }) => (
        <Link
          href={href}
          key={title}
          className={cn("group", pathname === href ? "active" : "")}
          onClick={() => ToggleSubMenu(!!subMenu)}
        >
          {title}
          {subMenu && <ChevronDown />}
          {subMenu && (
            <ul className={cn("hidden", open && "active")}>
              {subMenu.map(({ title, href }) => (
                <Link href={href} key={title}>
                  {title}
                </Link>
              ))}
            </ul>
          )}
        </Link>
      ))}
    </nav>
  );
};

const MobileNav = () => {
  return (
    <>
      <Navigation className="hidden md:flex" />
      <Sheet>
        <SheetTrigger className="md:hidden">
          <TextAlignEnd className="size-6" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-4 items-start gap-8 md:hidden overflow-y-auto"
        >
          <SheetClose>
            <Image
              src="/images/logo-t.png"
              alt="Logo"
              width={200}
              height={60}
              className="h-10"
            />
          </SheetClose>
          <Navigation />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
