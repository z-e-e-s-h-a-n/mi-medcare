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
import { useConfirm } from "@hooks/use-confirm";
import { useUpdateMedia, useRemoveMedia } from "@hooks/media";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@components/ui/alert-dialog";
import { Input } from "@components/ui/input";
import { useState } from "react";

interface MediaCardProps {
  media: MediaResponse;
  onSelect?: (media: MediaResponse) => void;
}

export function MediaCard({ media, onSelect }: MediaCardProps) {
  const [filename, setFilename] = useState(media.filename);
  const { updateAsync } = useUpdateMedia(media.id);
  const { removeAsync, isRemoving } = useRemoveMedia();
  const isImage = media.mimeType.startsWith("image/");
  const { confirm } = useConfirm();

  const handleDelete = async (id: string) => {
    const ok = await confirm();
    if (!ok) return;
    await removeAsync({ id });
  };

  const handleRename = async (filename: string) => {
    try {
      await updateAsync({ filename });
      toast.success("File Renamed Successfully.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("error:", err);
      toast.error(err.message);
    }
  };

  return (
    <div
      onClick={() => onSelect?.(media)}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-background transition-all duration-300 ease-out",
        onSelect && "cursor-pointer hover:ring-2 hover:ring-primary",
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

            <AlertDialog>
              <DropdownMenuContent align="end" className="w-40">
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Pencil className="size4" />
                    Rename
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Download className="size4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                  onClick={() => handleDelete(media.id)}
                  disabled={isRemoving}
                >
                  <Trash2 className="size4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
              <AlertDialogContent className="w-full max-w-md! p-8 gap-6">
                <AlertDialogTitle>
                  Rename: <span className="text-primary">{media.filename}</span>
                </AlertDialogTitle>
                <Input
                  name="filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleRename(filename)}>
                    Rename
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
