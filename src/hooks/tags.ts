import * as tags from "@lib/tags/client";
import { createCrudHooks } from "@/hooks/crud";

export const {
    useEntity: useTag,
    useEntities: useTags,
    useRemoveEntity: useRemoveTag,
    useRestoreEntity: useRestoreTag,
} = createCrudHooks(
    {
        findOne: tags.findOneTag,
        findAll: tags.findAllTags,
        create: tags.createTag,
        update: tags.updateTag,
        remove: tags.removeTag,
        restore: tags.restoreTag,
    },
    {
        single: "tag",
        list: "tags",
    }
);
