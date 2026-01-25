import type { Prisma } from "@generated/prisma";
import prisma from "@lib/core/prisma";
import { CategoryOrderByWithRelationInput, CategoryWhereInput } from "prisma/generated/models";

export class CategoryService {
  async createCategory(dto: CUCategoryDto) {

    const category = await prisma.category.create({
      data: dto,
      include: this.categoryInclude
    });

    return {
      message: "Category created successfully",
      data: category,
    };
  }

  async updateCategory(id: string, dto: CUCategoryDto) {

    const category = await prisma.category.update({
      where: { id },
      data: dto,
      include: this.categoryInclude
    });

    return {
      message: "Category updated successfully",
      data: category,
    };
  }

  async findCategoryById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: this.categoryInclude
    });
    return {
      message: "Category fetched successfully",
      data: category,
    };
  }

  async findAllCategories(query: CategoryQueryDto) {
    const { page, limit, sortBy, sortOrder, search, searchBy } = query;

    const where: Prisma.CategoryWhereInput = {};

    if (search && searchBy) {
      const searchWhereMap: Record<typeof searchBy, CategoryWhereInput> = {
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
    let orderBy: CategoryOrderByWithRelationInput = { [sortBy]: sortOrder };

    if (sortBy === "posts") {
      orderBy = { "posts": { _count: sortOrder } }
    } else if (sortBy === "parent") {
      orderBy = { "parent": { name: sortOrder } }
    }

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: this.categoryInclude
      }),
      prisma.category.count({ where }),
    ]);

    return {
      message: "Categories fetched successfully",
      data: {
        categories,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteCategory(id: string) {
    await prisma.category.delete({
      where: { id },
    });

    return {
      message: "Category deleted successfully",
    };
  }

  categoryInclude = {
    parent: true,
    children: true,
    posts: true,
  }

}

export const categoryService = new CategoryService();
