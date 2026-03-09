/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@workspace/ui/lib/utils";

export function MegaMenu({ item }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="grid w-175 grid-cols-3 gap-6 p-6"
    >
      {/* Links */}
      <div
        className={cn(
          "grid grid-cols-2 gap-4",
          item.featured ? "col-span-2" : "col-span-3",
        )}
      >
        {item.children.map((child: any) => {
          const Icon = child.icon;

          return (
            <Link
              key={child.title}
              href={child.href}
              className="group flex gap-3 rounded-lg p-3 hover:bg-muted transition"
            >
              {Icon && <Icon className="mt-1 size-6 shrink-0 text-primary" />}

              <div>
                <div className="text-sm font-medium">{child.title}</div>

                <p className="text-xs text-muted-foreground">
                  {child.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Featured Card */}
      {item.featured && (
        <Link
          href={item.featured.href}
          className="relative overflow-hidden rounded-xl bg-muted"
        >
          <Image src={item.featured.image} fill alt="Nav Image" />

          <div className="absolute inset-0 bg-black/40 p-4 text-white flex flex-col justify-end">
            <div className="text-sm font-semibold">{item.featured.title}</div>

            <p className="text-xs opacity-90">{item.featured.description}</p>
          </div>
        </Link>
      )}
    </motion.div>
  );
}
