/* eslint-disable @typescript-eslint/no-explicit-any */
import { Commands, Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageNode } from "./image-node";

export interface ImageOptions {
  inline?: boolean;
  HTMLAttributes?: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      insertImage: (attrs: {
        src: string;
        alt?: string;
        width?: number;
        height?: number;
      }) => ReturnType;
    };
  }
}

export const Image = Node.create<ImageOptions>({
  name: "image",
  group: "block",
  atom: false,
  draggable: true,
  selectable: true,

  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: { default: "" },
      alt: { default: "" },
      width: { default: 300 },
      height: { default: 200 },
      style: { default: {} },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='resizable-image']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({ "data-type": "resizable-image" }, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },

  addCommands() {
    return {
      insertImage:
        (attrs: {
          src: string;
          alt?: string;
          width?: number;
          height?: number;
        }) =>
        ({ commands }: { commands: Commands }) => {
          return commands.image.insertImage(attrs);
        },
    } as any; // 使用类型断言来解决类型问题
  },
});
