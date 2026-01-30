"use client";

import { useState } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import "@components/tiptap-node/image-node/image-node.scss";
import { Resizable } from "re-resizable";
import Image from "next/image";

export const ImageNode: React.FC<NodeViewProps> = (props) => {
  const { editor, node, getPos } = props;
  const { src, alt, width = 300, height = 200 } = node.attrs;

  const [imageWidth, setImageWidth] = useState<number>(width);
  const [imageHeight, setImageHeight] = useState<number>(height);

  return (
    <NodeViewWrapper
      className="resizable-image-node max-w-full"
      style={{ display: "block", width: "100%" }}
    >
      <Resizable
        size={{ width: imageWidth, height: imageHeight }}
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: false,
          topRight: true,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
        onResizeStop={(e, dir, ref) => {
          const newWidth = ref.offsetWidth;
          const newHeight = ref.offsetHeight;
          setImageWidth(newWidth);
          setImageHeight(newHeight);
          const pos = getPos();
          if (typeof pos === "number") {
            editor
              .chain()
              .focus()
              .command(({ tr }) => {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  width: newWidth,
                  height: newHeight,
                });
                return true;
              })
              .run();
          }
        }}
        style={{
          display: "inline-block",
          float: "left",
          marginRight: "1rem",
          border: editor.isActive("image")
            ? "2px solid #3b82f6"
            : "1px dashed #ccc",
          borderRadius: "4px",
          transition: "all 0.2s ease",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </Resizable>
    </NodeViewWrapper>
  );
};
