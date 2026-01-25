import * as media from "@lib/media/client";
import { createCrudHooks } from "@/hooks/crud";

export const {
    useEntity: useMedia,
    useEntities: useMedias,
    useCUEntity: useCUMedia,
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
    }
);
