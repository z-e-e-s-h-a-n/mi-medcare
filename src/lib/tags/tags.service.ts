import type { Prisma } from "@generated/prisma";
import prisma from "@lib/core/prisma";
import { TagWhereInput } from "prisma/generated/models";

class TagService {
  async createTag(dto: CUTagDto) {
    const tag = await prisma.tag.create({
      data: dto,
    });

    return {
      message: "Tag created successfully",
      data: tag,
    };
  }

  async updateTag(id: string, dto: CUTagDto) {
    const tag = await prisma.tag.update({
      where: { id },
      data: dto,
    });

    return {
      message: "Tag updated successfully",
      data: tag,
    };
  }

  async findTag(id: string) {
    const tag = await prisma.tag.findFirstOrThrow({
      where: { OR: [{ id }, { slug: id }] },
    });

    return {
      message: "Tag fetched successfully",
      data: tag,
    };
  }

  async findAllTags(query: TagQueryDto) {
    const { page, limit, sortBy, sortOrder, search, searchBy } = query;

    const where: Prisma.TagWhereInput = {};

    if (search && searchBy) {
      const searchWhereMap: Record<typeof searchBy, TagWhereInput> = {
        id: { id: search },
        name: {
          name: { contains: search, mode: "insensitive" },
        },
        slug: {
          slug: { contains: search, mode: "insensitive" },
        },
      };
      Object.assign(where, searchWhereMap[searchBy]);
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [tags, total] = await Promise.all([
      prisma.tag.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: { posts: true },
      }),
      prisma.tag.count({ where }),
    ]);

    return {
      message: "Tags fetched successfully",
      data: {
        tags,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteTag(id: string) {
    await prisma.tag.delete({
      where: { id },
    });

    return {
      message: "Tag deleted successfully",
    };
  }
}

export const tagService = new TagService();
