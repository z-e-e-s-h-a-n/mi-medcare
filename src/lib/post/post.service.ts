import type { Prisma } from "@generated/prisma";
import prisma from "@lib/core/prisma";
import { tokenService } from "@lib/auth/token.service";
import { NextRequest } from "next/server";
import { slugify } from "@utils/general";
import {
  PostOrderByWithRelationInput,
  PostWhereInput,
} from "prisma/generated/models";

class PostService {
  async createPost(dto: CUPostDto, req: NextRequest) {
    const authorId = (await tokenService.getDecodeUser(req))?.id;

    const post = await prisma.post.create({
      data: {
        ...dto,
        authorId,
        tags: this.connectOrCreateTags(dto),
        publishedAt: dto.status === "published" ? new Date() : null,
      },
      include: this.postInclude,
    });

    return {
      message: "Post created successfully",
      data: post,
    };
  }

  async updatePost(id: string, dto: CUPostDto) {
    const existingPost = await prisma.post.findUniqueOrThrow({
      where: { id },
      select: { status: true, publishedAt: true },
    });

    let publishedAt = existingPost.publishedAt;

    if (dto.status === "published" && existingPost.status !== "published") {
      publishedAt = new Date();
    } else if (dto.status !== "published") {
      publishedAt = null;
    }
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...dto,
        tags: this.connectOrCreateTags(dto),
        publishedAt,
      },
      include: this.postInclude,
    });

    return {
      message: "Post updated successfully",
      data: post,
    };
  }

  async findPost(id: string, req: NextRequest) {
    const post = await prisma.post.findFirstOrThrow({
      where: { OR: [{ id }, { slug: id }] },
      include: this.postInclude,
    });

    if (post.slug === id) {
      await this.addPostView(post.id, req);
    }

    return {
      message: "Post fetched successfully",
      data: post,
    };
  }

  async findAllPosts(query: PostQueryDto) {
    const { page, limit, sortBy, sortOrder, search, searchBy, status } = query;

    const where: Prisma.PostWhereInput = {};

    if (status) where.status = status;

    if (search && searchBy) {
      const searchWhereMap: Record<typeof searchBy, PostWhereInput> = {
        id: { id: search },
        title: {
          title: { contains: search, mode: "insensitive" },
        },
        slug: {
          slug: { contains: search, mode: "insensitive" },
        },
        author: {
          author: { displayName: { contains: search, mode: "insensitive" } },
        },
        category: {
          OR: [
            { category: { name: { contains: search, mode: "insensitive" } } },
            { category: { slug: { contains: search, mode: "insensitive" } } },
          ],
        },
        tags: {
          OR: [
            {
              tags: {
                some: {
                  OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { slug: { contains: search, mode: "insensitive" } },
                  ],
                },
              },
            },
          ],
        },
      };
      Object.assign(where, searchWhereMap[searchBy]);
    }

    const skip = (page - 1) * limit;
    let orderBy: PostOrderByWithRelationInput = { [sortBy]: sortOrder };

    if (sortBy === "category") {
      orderBy = { category: { name: sortOrder } };
    } else if (sortBy === "author") {
      orderBy = { author: { displayName: sortOrder } };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: this.postInclude,
      }),
      prisma.post.count({ where }),
    ]);

    return {
      message: "Posts fetched successfully",
      data: {
        posts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deletePost(id: string) {
    await prisma.post.delete({
      where: { id },
    });

    return {
      message: "Post deleted successfully",
    };
  }

  private connectOrCreateTags(dto: CUPostDto) {
    return {
      connectOrCreate: dto.tags.map((tag) => ({
        where: { name: tag.name },
        create: {
          name: tag.name,
          slug: slugify(tag.name),
        },
      })),
    };
  }

  private async addPostView(postId: string, req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    const lastView = await prisma.postView.findFirst({
      where: {
        postId,
        ip,
        userAgent,
        viewedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { viewedAt: "desc" },
    });

    if (!lastView) {
      await prisma.postView.create({
        data: { postId, ip, userAgent },
      });

      await prisma.post.update({
        where: { id: postId },
        data: { views: { increment: 1 } },
      });
    } else {
      console.log(
        "User already viewed in the last 24 hours, skipping increment",
      );
    }
  }

  postInclude = {
    author: { omit: { password: true } },
    category: true,
    cover: true,
    tags: true,
  };
}

export const postService = new PostService();
