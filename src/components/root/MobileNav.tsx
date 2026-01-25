"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainMenu } from "../../lib/constants/menu";
import { cn } from "../../lib/utils/general";
import { ChevronDown, TextAlignEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const pathname = usePathname();

  const toggleSubMenu = (title: string, hasSub?: boolean) => {
    if (!hasSub) {
      setOpenMenu(null);
      return;
    }
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  return (
    <nav className={cn("navigation", className)}>
      {mainMenu.slice(0, 6).map(({ title, href, subMenu }) => {
        const Comp = subMenu ? "div" : Link;

        return (
          <Comp
            href={href}
            key={title}
            className={cn("group", pathname === href ? "active" : "")}
            onClick={() => toggleSubMenu(title, !!subMenu)}
          >
            {title}
            {subMenu && <ChevronDown />}
            {subMenu && (
              <ul className={cn("hidden", openMenu === title && "active")}>
                {subMenu.map(({ title, href }) => (
                  <Link href={href} key={title}>
                    {title}
                  </Link>
                ))}
              </ul>
            )}
          </Comp>
        );
      })}
    </nav>
  );
};

const MobileNav = () => {
  return (
    <>
      <Navigation className="hidden lg:flex mr-4 lg:mr-16" />
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <TextAlignEnd className="size-6" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-4 items-start gap-8 lg:hidden overflow-y-auto"
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
