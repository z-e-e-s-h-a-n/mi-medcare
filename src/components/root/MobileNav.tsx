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
    <nav
      className={cn(
        "flex flex-col lg:flex-row lg:items-center gap-6",
        className,
      )}
    >
      {mainMenu.slice(0, 7).map(({ title, href, subMenu }) => {
        const Comp = subMenu ? "div" : Link;

        return (
          <Comp
            href={href}
            key={title}
            className={cn(
              "group cursor-pointer relative my-auto flex lg:justify-center lg:items-center flex-wrap lg:gap-0 hover:text-primary",
              pathname === href ? "text-primary font-medium" : "",
              subMenu &&
                "before:absolute before:content-[''] before:top-0 before:h-16 before:w-full",
            )}
            onClick={() => toggleSubMenu(title, !!subMenu)}
          >
            {title}
            {subMenu && <ChevronDown className="size-5 stroke-1" />}
            {subMenu && (
              <ul
                className={cn(
                  "hidden lg:group-hover:flex basis-full lg:absolute top-[150%] z-20 p-4 lg:rounded-2xl lg:bg-secondary flex-wrap gap-4 w-full lg:w-xl text-sm dot-list",
                  openMenu === title && "flex",
                )}
              >
                {subMenu.map(({ title, href }) => (
                  <Link
                    href={href}
                    key={title}
                    className="basis-full lg:basis-[calc(33%-16px)] text-foreground hover:text-primary"
                  >
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
