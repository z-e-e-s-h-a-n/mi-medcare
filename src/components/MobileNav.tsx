"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainMenu } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TextAlignEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn("navigation", className)}>
      {mainMenu.slice(0, 5).map(({ title, href }) => (
        <Link
          href={href}
          key={title}
          className={cn(pathname === href ? "active" : "")}
        >
          {title}
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
        <SheetContent side="left" className="p-4 items-start gap-8">
          <SheetClose>
            <Image
              src="/images/logo-t.png"
              alt="Logo"
              width={200}
              height={60}
            />
          </SheetClose>
          <Navigation />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
