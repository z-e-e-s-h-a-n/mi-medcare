"use client";

import { useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import { useCreateMedia } from "@hooks/media";
import { toast } from "sonner";
import { cn } from "@utils/general";
import { Button } from "@components/ui/button";
import Image from "next/image";

export interface MediaUploaderProps {
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(2)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function MediaUploader({
  accept = { "image/*": [] },
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024,
}: MediaUploaderProps) {
  const { createAsync, isCreating } = useCreateMedia();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles.slice(0, maxFiles));
  };

  const uploadSequentially = async () => {
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        await createAsync(formData);

        toast.success(`${file.name} uploaded`);

        setFiles((prev) => prev.filter((f) => f !== file));
      } catch {
        toast.error(`${file.name} failed to upload`);
      }
    }
  };

  const removeFile = (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    multiple: maxFiles > 1,
    disabled: files.length > 0,
  });

  const maxSizeMB = Math.round(maxSize / (1024 * 1024));

  return (
    <div className="space-y-4">
      {/* FILE LIST */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between rounded-lg border px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={200}
                  height={200}
                  className="size-12 object-cover rounded-md"
                />
                <div>
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFile(file)}
                disabled={isCreating}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}

          {/* UPLOAD BUTTON */}
          <div className="flex justify-end">
            <Button onClick={uploadSequentially} disabled={isCreating}>
              {isCreating ? "Uploading..." : "Upload files"}
            </Button>
          </div>
        </div>
      )}

      {/* DROPZONE */}
      {files.length === 0 && (
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-[1.5px] border-dashed px-6 py-10 text-center cursor-pointer transition",
            "border-muted hover:border-primary hover:bg-primary/10",
            isDragActive && "border-primary bg-primary/10",
          )}
        >
          <input {...getInputProps()} />
          <Upload className="size-8 text-muted-foreground" />
          <p className="text-sm font-medium">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            Max {maxFiles} files, {maxSizeMB}MB each
          </p>
        </div>
      )}
    </div>
  );
}

export default MediaUploader;
