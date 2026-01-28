import type { Prisma } from "@generated/prisma";
import { tokenService } from "@lib/auth/token.service";
import { uploaderService } from "@lib/core/cloudinary";
import prisma from "@lib/core/prisma";
import { NextRequest } from "next/server";
import { MediaWhereInput } from "prisma/generated/models";

class MediaService {
  async createMedia(req: NextRequest) {
    const user = await tokenService.getDecodeUser(req);
    const uploadResult = await uploaderService.uploadStream(req);

    const media = await prisma.media.create({
      data: {
        uploadedById: user.id,
        url: uploadResult.secure_url,
        filename: uploadResult.original_filename,
        mimeType: `${uploadResult.resource_type}/${uploadResult.format}`,
        size: uploadResult.bytes,
      },
      include: this.mediaInclude,
    });

    return {
      message: "Media uploaded successfully",
      data: media,
    };
  }

  async updateMedia(id: string, dto: MediaUpdateDto) {
    const updated = await prisma.media.update({
      where: { id },
      data: dto,
      include: this.mediaInclude,
    });

    return {
      message: "Media updated successfully",
      data: updated,
    };
  }

  async findMediaById(id: string) {
    const media = await prisma.media.findUniqueOrThrow({
      where: { id },
      include: this.mediaInclude,
    });

    return {
      message: "Media fetched successfully",
      data: media,
    };
  }

  async findAllMedia(query: MediaQueryDto) {
    const { page, limit, sortBy, sortOrder, search, searchBy, mimeType } =
      query;

    const where: Prisma.MediaWhereInput = {};

    if (mimeType) where.mimeType = { contains: mimeType, mode: "insensitive" };

    if (search && searchBy) {
      const searchWhereMap: Record<typeof searchBy, MediaWhereInput> = {
        id: { id: search },
        filename: {
          filename: { contains: search, mode: "insensitive" },
        },
      };
      Object.assign(where, searchWhereMap[searchBy]);
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [medias, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: this.mediaInclude,
      }),
      prisma.media.count({ where }),
    ]);

    return {
      message: "Media fetched successfully",
      data: {
        medias,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteMedia(id: string) {
    console.log(" req delete media");

    await prisma.media.delete({
      where: { id },
    });

    return {
      message: "Media deleted successfully",
    };
  }

  mediaInclude = { uploadedBy: { omit: { password: true } } };
}

export const mediaService = new MediaService();
