"use client";

import Image from "next/image";
import { cn } from "@lib/utils/general";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  MoreVertical,
  Trash2,
  Download,
  Pencil,
  ImageIcon,
  FileIcon,
} from "lucide-react";
import { Button } from "@components/ui/button";

interface MediaCardProps {
  media: MediaResponse;
  selectable?: boolean;
  onSelect?: (media: MediaResponse) => void;
}

export function MediaCard({ media, selectable, onSelect }: MediaCardProps) {
  const isImage = media.mimeType.startsWith("image/");

  return (
    <div
      onClick={() => onSelect?.(media)}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-background transition-all duration-300 ease-out",
        selectable && "cursor-pointer hover:ring-2 hover:ring-primary",
      )}
    >
      {/* Preview */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {isImage ? (
          <Image
            src={media.url}
            alt={media.filename}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileIcon className="size-10 text-muted-foreground" />
          </div>
        )}

        {/* Top overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out" />

        {/* Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="size-8 rounded-full"
              >
                <MoreVertical className="size4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="gap-2">
                <Pencil className="size4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Download className="size4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                <Trash2 className="size4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* File type badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
          {isImage ? (
            <ImageIcon className="size-3" />
          ) : (
            <FileIcon className="size-3" />
          )}
          {media.mimeType.split("/")[1]}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1 p-3">
        <p className="truncate text-sm font-medium">{media.filename}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span> {(media.size / 1024).toFixed(1)} KB</span>
          <span>{new Date(media.createdAt).toLocaleDateString()}</span>
        </div>
        <span className="truncate text-[11px] text-muted-foreground">
          By: {media.uploadedBy.displayName}
        </span>
      </div>
    </div>
  );
}
