"use client";

import { forwardRef } from "react";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { ImagePlusIcon } from "@/components/tiptap-icons/image-plus-icon";
import { useTiptapEditor } from "@/hooks/tiptap/use-tiptap-editor";
import { useMediaLibrary } from "@hooks/media";
import type { Editor } from "@tiptap/core";

export const ImageUploadButton = forwardRef<
  HTMLButtonElement,
  { editor?: Editor | null }
>(({ editor: providedEditor }, ref) => {
  const { editor } = useTiptapEditor(providedEditor);
  const { onMediaSelect } = useMediaLibrary();

  const handleClick = () => {
    if (!editor || !editor.isEditable) return;

    onMediaSelect((media) => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "image",
          attrs: {
            src: media.url,
            alt: media.filename,
            title: media.filename,
            width: 300,
            height: 200,
          },
        })
        .run();
    });
  };

  return (
    <Button
      ref={ref}
      type="button"
      data-style="ghost"
      tooltip="Add image"
      onClick={handleClick}
      disabled={!editor || !editor.isEditable}
    >
      <ImagePlusIcon className="tiptap-button-icon" />
    </Button>
  );
});

ImageUploadButton.displayName = "ImageUploadButton";
