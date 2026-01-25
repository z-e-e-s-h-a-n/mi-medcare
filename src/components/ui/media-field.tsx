"use client";

import React from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { FormField, type BaseFieldProps } from "./form";
import { Button } from "./button";
import { cn } from "@lib/utils/general";
import Image from "next/image";
import { Input } from "./input";
import { toast } from "sonner";
import { useCUMedia } from "@hooks/media";

export interface MediaFieldProps<TFormData> extends BaseFieldProps<TFormData> {
  accept?: string;
  maxSize?: number;
  label?: string;
  defaultMedia?: MediaResponse
}

export const MediaField = <TFormData,>({
  accept = "image/*",
  maxSize,
  label,
  defaultMedia,
  ...props
}: MediaFieldProps<TFormData>) => {
  const { mutateAsync, isPending } = useCUMedia(defaultMedia?.id)
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  return (
    <FormField {...props}>
      {(field) => {
        const value = defaultMedia?.url;
        const previewSrc = preview ?? value ?? null;

        const handleRemove = () => {
          setPreview(null);
          field.onChange(undefined);
          if (fileInputRef.current) fileInputRef.current.value = "";
        };

        const handleFileSelect = async (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          const file = e.target.files?.[0];
          if (!file) return;

          if (maxSize && file.size > maxSize) {
            toast.error("File too large", {
              description: `Max ${Math.round(maxSize / 1024 / 1024)}MB`,
            });
            return;
          }

          // preview first (optimistic UX)
          const reader = new FileReader();
          reader.onload = () => setPreview(reader.result as string);
          reader.readAsDataURL(file);


          try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await mutateAsync(formData);

            field.onChange(res.url);

            toast.success(defaultMedia?.id ? "Media updated" : "Media uploaded");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: any) {
            console.error(err);
            toast.error(err?.message || "Upload failed");
            setPreview(null);
          } finally {
          }
        };



        return (
          <div className="flex flex-col gap-2">
            {label && <label className="text-sm font-medium">{label}</label>}

            {previewSrc ? (
              <div className="relative group">
                <div className="relative w-full h-48 rounded-md border border-input overflow-hidden bg-muted">
                  <Image src={previewSrc} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isPending}
                    >
                      <Upload className="size-4" /> Replace
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={handleRemove}
                      disabled={isPending}
                    >
                      <X className="size-4" /> Remove
                    </Button>
                  </div>
                </div>
                {isPending && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm">
                    Uploading...
                  </div>
                )}
              </div>
            ) : (
              <div
                className={cn(
                  "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md border-input bg-muted/50 cursor-pointer hover:bg-muted",
                  isPending && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !isPending && fileInputRef.current?.click()}
              >
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept={accept}
                  className="hidden"
                  disabled={isPending}
                  onChange={handleFileSelect}
                />
                <ImageIcon className="size-12 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-muted-foreground">
                  {isPending ? "Uploading..." : "Click to upload"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {accept} {maxSize && `(Max ${Math.round(maxSize / 1024 / 1024)}MB)`}
                </p>
              </div>
            )}
          </div>
        );
      }}
    </FormField>
  );
};
