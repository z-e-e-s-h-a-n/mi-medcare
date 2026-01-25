import type { Prisma } from "@generated/prisma";
import { authService } from "@lib/auth/auth.service";
import prisma from "@lib/core/prisma";
import { UserWhereInput } from "prisma/generated/models";

export class AdminService {
  async createUser(dto: CUUserDto) {
    const { role, ...rest } = dto;
    const { user } = await authService.createUser(rest, role);

    return {
      message: "Customer created successfully",
      data: user,
    };
  }

  async findAllUsers(query: UserQueryDto) {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      searchBy,
      role,
      isEmailVerified,
    } = query;

    const where: Prisma.UserWhereInput = {};

    if (role) where.role = role;

    if (isEmailVerified !== undefined) where.isEmailVerified = isEmailVerified;

    if (search && searchBy) {
      const searchWhereMap: Record<typeof searchBy, UserWhereInput> = {
        id: { id: search },
        email: {
          email: { contains: search, mode: "insensitive" },
        },
        displayName: {
          displayName: { contains: search, mode: "insensitive" },
        },
      };
      Object.assign(where, searchWhereMap[searchBy]);
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: authService.userSelect,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      message: "Users fetched successfully.",
      data: {
        users: users,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export const adminService = new AdminService();
