import { ulid } from "ulid";
import type { Request, Response } from "express";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@workspace/db/client";

import type {
  CategoryDto,
  CategoryQueryDto,
  PostDto,
  PostQueryDto,
  TagDto,
  TagQueryDto,
} from "@workspace/contracts/content";
import { futureDate } from "@workspace/shared/utils";

import { AuditService } from "@/modules/audit/audit.service";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { ClientService } from "@/modules/client/client.service";

@Injectable()
export class ContentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly client: ClientService,
  ) {}

  async createCategory(dto: CategoryDto, userId?: string) {
    const category = await this.prisma.category.create({
      data: dto,
      include: this.getCategoryInclude(),
    });

    await this.logMutation("create", "Category", category.id, userId, dto);

    return {
      message: "Category created successfully.",
      data: category,
    };
  }

  async updateCategory(id: string, dto: CategoryDto, userId?: string) {
    const category = await this.prisma.category.update({
      where: { id },
      data: dto,
      include: this.getCategoryInclude(),
    });

    await this.logMutation("update", "Category", id, userId, dto);

    return {
      message: "Category updated successfully.",
      data: category,
    };
  }

  async deleteCategory(id: string, force = false, userId?: string) {
    await this.prisma.category.delete({
      where: { id },
      ...({ force } as any),
    });

    await this.logMutation("delete", "Category", id, userId, { force });

    return { message: "Category deleted successfully." };
  }

  async restoreCategory(id: string, userId?: string) {
    await this.prisma.category.update({
      where: { id },
      data: { deletedAt: null },
    });

    await this.logMutation("update", "Category", id, userId, {
      deletedAt: null,
    });

    return { message: "Category restored successfully." };
  }

  async queryCategories(query: CategoryQueryDto, publishedOnly = false) {
    const { page, limit, sortBy, sortOrder, search, searchBy } = query;
    const where: Prisma.CategoryWhereInput = {};

    if (search && searchBy) {
      const searchWhereMap: Record<typeof searchBy, Prisma.CategoryWhereInput> =
        {
          id: { id: search },
          name: { name: { contains: search, mode: "insensitive" } },
          slug: { slug: { contains: search, mode: "insensitive" } },
        };

      Object.assign(where, searchWhereMap[searchBy]);
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: this.getCategoryInclude(publishedOnly),
      }),
      this.prisma.category.count({ where }),
    ]);

    return {
      message: "Categories fetched successfully.",
      data: {
        categories,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCategoryById(id: string) {
    const category = await this.prisma.category.findUniqueOrThrow({
      where: { id },
      include: this.getCategoryInclude(),
    });

    return {
      message: "Category fetched successfully.",
      data: category,
    };
  }

  async getCategoryBySlug(slug: string, publishedOnly = false) {
    const category = await this.prisma.category.findFirstOrThrow({
      where: { slug },
      include: this.getCategoryInclude(publishedOnly),
    });

    return {
      message: "Category fetched successfully.",
      data: category,
    };
  }

  async createTag(dto: TagDto, userId?: string) {
    const tag = await this.prisma.tag.create({ data: dto });

    await this.logMutation("create", "Tag", tag.id, userId, dto);

    return {
      message: "Tag created successfully.",
      data: tag,
    };
  }

  async updateTag(id: string, dto: TagDto, userId?: string) {
    const tag = await this.prisma.tag.update({
      where: { id },
      data: dto,
    });

    await this.logMutation("update", "Tag", id, userId, dto);

    return {
      message: "Tag updated successfully.",
      data: tag,
    };
  }

  async deleteTag(id: string, force = false, userId?: string) {
    await this.prisma.tag.delete({
      where: { id },
      ...({ force } as any),
    });

    await this.logMutation("delete", "Tag", id, userId, { force });

    return { message: "Tag deleted successfully." };
  }

  async restoreTag(id: string, userId?: string) {
    await this.prisma.tag.update({
      where: { id },
      data: { deletedAt: null },
    });

    await this.logMutation("update", "Tag", id, userId, {
      deletedAt: null,
    });

    return { message: "Tag restored successfully." };
  }

  async queryTags(query: TagQueryDto, publishedOnly = false) {
    const { page, limit, sortBy, sortOrder, search, searchBy, includeIds } =
      query;
    const where: Prisma.TagWhereInput = {};

    if (search && searchBy) {
      const searchWhereMap: Record<typeof searchBy, Prisma.TagWhereInput> = {
        id: { id: search },
        name: { name: { contains: search, mode: "insensitive" } },
        slug: { slug: { contains: search, mode: "insensitive" } },
      };

      Object.assign(where, searchWhereMap[searchBy]);
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [items, total] = await Promise.all([
      this.prisma.tag.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: this.getTagsInclude(publishedOnly),
      }),
      this.prisma.tag.count({ where }),
    ]);

    const existingIds = new Set(items.map((item) => item.id));
    const missingIncludeIds = includeIds.filter((id) => !existingIds.has(id));

    const forcedItems = missingIncludeIds.length
      ? await this.prisma.tag.findMany({
          where: { id: { in: missingIncludeIds } },
          include: this.getTagsInclude(publishedOnly),
        })
      : [];

    const merged = [...forcedItems, ...items].filter(
      (item, index, arr) => index === arr.findIndex((x) => x.id === item.id),
    );

    return {
      message: "Tags fetched successfully.",
      data: {
        tags: merged,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTagById(id: string) {
    const tag = await this.prisma.tag.findUniqueOrThrow({
      where: { id },
      include: this.getTagsInclude(),
    });

    return {
      message: "Tag fetched successfully.",
      data: tag,
    };
  }

  async getTagBySlug(slug: string, publishedOnly = false) {
    const tag = await this.prisma.tag.findFirstOrThrow({
      where: { slug },
      include: this.getTagsInclude(publishedOnly),
    });

    return {
      message: "Tag fetched successfully.",
      data: tag,
    };
  }

  async createPost(dto: PostDto, authorId: string) {
    const { tagIds, ...rest } = dto;

    const post = await this.prisma.post.create({
      data: {
        ...rest,
        authorId,
        tags: { connect: tagIds.map((id: string) => ({ id })) },
      },
      include: this.postInclude,
    });

    await this.logMutation("create", "Post", post.id, authorId, dto);

    return {
      message: "Post created successfully.",
      data: post,
    };
  }

  async updatePost(id: string, dto: PostDto, userId?: string) {
    const { tagIds, ...rest } = dto;

    const post = await this.prisma.post.update({
      where: { id },
      data: {
        ...rest,
        tags: { set: tagIds.map((tagId: string) => ({ id: tagId })) },
      },
      include: this.postInclude,
    });

    await this.logMutation("update", "Post", id, userId, dto);

    return {
      message: "Post updated successfully.",
      data: post,
    };
  }

  async deletePost(id: string, force = false, userId?: string) {
    await this.prisma.post.delete({
      where: { id },
      ...({ force } as any),
    });

    await this.logMutation("delete", "Post", id, userId, { force });

    return { message: "Post deleted successfully." };
  }

  async restorePost(id: string, userId?: string) {
    await this.prisma.post.update({
      where: { id },
      data: { deletedAt: null },
    });

    await this.logMutation("update", "Post", id, userId, {
      deletedAt: null,
    });

    return { message: "Post restored successfully." };
  }

  async queryPosts(query: PostQueryDto, publishedOnly = false) {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      searchBy,
      status,
      categoryId,
      authorId,
      tagId,
    } = query;

    const where: Prisma.PostWhereInput = {};

    if (publishedOnly) where.status = "published";
    else if (status) where.status = status;

    if (categoryId) where.categoryId = categoryId;
    if (authorId) where.authorId = authorId;
    if (tagId) where.tags = { some: { id: tagId } };

    if (search && searchBy) {
      const searchWhereMap: Record<typeof searchBy, Prisma.PostWhereInput> = {
        id: { id: search },
        title: { title: { contains: search, mode: "insensitive" } },
        slug: { slug: { contains: search, mode: "insensitive" } },
        category: {
          category: { slug: { contains: search, mode: "insensitive" } },
        },
        tags: {
          tags: { some: { slug: { contains: search, mode: "insensitive" } } },
        },
      };

      Object.assign(where, searchWhereMap[searchBy]);
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: this.postInclude,
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      message: "Posts fetched successfully.",
      data: {
        posts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getPostById(id: string) {
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { id },
      include: this.postInclude,
    });

    return {
      message: "Post fetched successfully.",
      data: post,
    };
  }

  async getPostBySlug(slug: string) {
    const post = await this.prisma.post.findFirstOrThrow({
      where: { slug, status: "published" },
      include: this.postInclude,
    });

    return {
      message: "Post fetched successfully.",
      data: post,
    };
  }

  async trackPostView(slug: string, req: Request, res: Response) {
    const post = await this.prisma.post.findFirstOrThrow({
      where: { slug, status: "published" },
      select: { id: true, viewsCount: true },
    });

    const visitorKeyClient = req.cookies["visitorKey"];
    const visitorKey = visitorKeyClient || ulid();
    const viewedAt = new Date();
    const viewedOn = new Date(viewedAt);
    viewedOn.setUTCHours(0, 0, 0, 0);

    const existingView = await this.prisma.postView.findUnique({
      where: {
        postId_visitorKey_viewedOn: {
          postId: post.id,
          visitorKey,
          viewedOn,
        },
      },
    });

    if (existingView)
      return {
        message: "Post view already tracked.",
        data: {
          tracked: false,
          viewsCount: post.viewsCount,
        },
      };

    const updatedView = await this.prisma.$transaction(async (tx) => {
      await tx.postView.create({
        data: {
          postId: post.id,
          visitorKey,
          viewedAt,
          viewedOn,
        },
      });

      return tx.post.update({
        where: { id: post.id },
        data: { viewsCount: { increment: 1 } },
        select: { viewsCount: true },
      });
    });

    if (!visitorKeyClient) {
      this.client.setCookie(res, "visitorKey", visitorKey, {
        expires: futureDate("1y"),
      });
    }

    return {
      message: "Post view tracked successfully.",
      data: {
        tracked: true,
        viewsCount: updatedView.viewsCount,
      },
    };
  }

  private async logMutation(
    action: "create" | "update" | "delete",
    entityType: string,
    entityId: string,
    userId?: string,
    meta?: unknown,
  ) {
    await this.auditService.log({
      action,
      entityType,
      entityId,
      userId,
      meta: JSON.parse(JSON.stringify(meta ?? {})) as Prisma.InputJsonValue,
    });
  }

  private getCategoryInclude(publishedOnly = false) {
    const postCountSelect = this.getPostCountSelect(publishedOnly);

    return {
      parent: true,
      children: {
        include: {
          _count: { select: { posts: postCountSelect } },
        },
      },
      _count: { select: { posts: postCountSelect } },
    } satisfies Prisma.CategoryInclude;
  }

  private getTagsInclude(publishedOnly = false) {
    return {
      _count: {
        select: { posts: this.getPostCountSelect(publishedOnly) },
      },
    } satisfies Prisma.TagInclude;
  }

  private getPostCountSelect(publishedOnly: boolean) {
    if (!publishedOnly) {
      return true as const;
    }

    return {
      where: {
        status: "published" as const,
      },
    };
  }

  private readonly postInclude = {
    author: { omit: { password: true } },
    category: true,
    cover: { include: { uploadedBy: { omit: { password: true } } } },
    tags: true,
  };
}
