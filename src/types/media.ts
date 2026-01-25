import type z from "zod";
import { MediaUpdateSchema, mediaQuerySchema } from "@schemas/media";
import { Media } from "@generated/prisma";

declare global {
  /* ======================================================
     MEDIA — TYPES
  ===================================================== */

  // client
  type MediaUpdateType = z.input<typeof MediaUpdateSchema>;
  type MediaQueryType = z.output<typeof mediaQuerySchema>;

  // server
  type MediaUpdateDto = z.output<typeof MediaUpdateSchema>;
  type MediaQueryDto = z.output<typeof mediaQuerySchema>;

  /* ======================================================
     MEDIA — RESPONSES
  ===================================================== */

  interface MediaResponse extends Media, BaseResponse {
    uploadedBy: UserResponse;
  }

  interface MediaQueryResponse extends BaseQueryResponse {
    medias: MediaResponse[];
  }
}

export {};
