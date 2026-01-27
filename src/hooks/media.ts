import * as media from "@lib/media/client";
import { createCrudHooks } from "@/hooks/crud";
import { useContext } from "react";
import { MediaLibraryContext } from "@/provider/media-library";

export function useMediaLibrary() {
  const ctx = useContext(MediaLibraryContext);
  if (!ctx) {
    throw new Error("useMediaLibrary must be used within MediaLibraryProvider");
  }
  return ctx;
}

export const {
  useEntity: useMedia,
  useEntities: useMedias,
  useCreateEntity: useCreateMedia,
  useUpdateEntity: useUpdateMedia,
  useRemoveEntity: useRemoveMedia,
  useRestoreEntity: useRestoreMedia,
} = createCrudHooks(
  {
    findOne: media.findOneMedia,
    findAll: media.findAllMedia,
    create: media.createMedia,
    update: media.updateMedia,
    remove: media.removeMedia,
    restore: media.restoreMedia,
  },
  {
    single: "media",
    list: "mediaList",
  },
);
