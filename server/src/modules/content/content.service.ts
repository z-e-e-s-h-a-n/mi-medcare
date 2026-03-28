import { BadRequestException, Injectable } from "@nestjs/common";
import type {
  CategoryDto,
  CategoryQueryDto,
  PostDto,
  PostQueryDto,
  TagDto,
  TagQueryDto,
} from "@workspace/contracts/content";
import type { Prisma } from "@workspace/db/client";

import { AuditService } from "@/modules/audit/audit.service";
import { PrismaService } from "@/modules/prisma/prisma.service";

@Injectable()
export class ContentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async createCategory(dto: CategoryDto, userId?: string) {
    const category = await this.prisma.category.create({
      data: dto,
      include: this.categoryInclude,
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
      include: this.categoryInclude,
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

  async queryCategories(query: CategoryQueryDto) {
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
        include: this.categoryInclude,
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
      include: this.categoryInclude,
    });

    return {
      message: "Category fetched successfully.",
      data: category,
    };
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.prisma.category.findFirstOrThrow({
      where: { slug },
      include: this.categoryInclude,
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

  async queryTags(query: TagQueryDto) {
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
        include: this.tagsInclude,
      }),
      this.prisma.tag.count({ where }),
    ]);

    const existingIds = new Set(items.map((item) => item.id));
    const missingIncludeIds = includeIds.filter((id) => !existingIds.has(id));

    const forcedItems = missingIncludeIds.length
      ? await this.prisma.tag.findMany({
          where: { id: { in: missingIncludeIds } },
          include: this.tagsInclude,
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
    });

    return {
      message: "Tag fetched successfully.",
      data: tag,
    };
  }

  async getTagBySlug(slug: string) {
    const tag = await this.prisma.tag.findFirstOrThrow({
      where: { slug },
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

  async createPostView(dto: {
    postId: string;
    trafficSourceId?: string;
    visitorKey: string;
  }) {
    if (!dto.visitorKey) {
      throw new BadRequestException("Visitor key is required.");
    }

    const viewedOn = new Date();
    viewedOn.setUTCHours(0, 0, 0, 0);

    const view = await this.prisma.$transaction(async (tx) => {
      const existingView = await tx.postView.findFirst({
        where: {
          postId: dto.postId,
          visitorKey: dto.visitorKey,
          viewedOn,
        } as any,
      });

      if (existingView) {
        return existingView;
      }

      const createdView = await tx.postView.create({
        data: { ...dto, viewedOn } as any,
      });

      await tx.post.update({
        where: { id: dto.postId },
        data: { viewsCount: { increment: 1 } },
      });

      return createdView;
    });

    return {
      message: "Post view tracked successfully.",
      data: view,
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

  private readonly categoryInclude = {
    parent: true,
    children: true,
    _count: { select: { posts: true } },
  };

  private readonly tagsInclude = {
    _count: { select: { posts: true } },
  };

  private readonly postInclude = {
    author: { omit: { password: true } },
    category: true,
    cover: { include: { uploadedBy: { omit: { password: true } } } },
    tags: true,
  };
}
