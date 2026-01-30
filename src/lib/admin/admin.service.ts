import type { Prisma } from "@generated/prisma";
import { authService } from "@lib/auth/auth.service";
import prisma from "@lib/core/prisma";
import { UserWhereInput } from "prisma/generated/models";

class AdminService {
  async createUser(dto: CUUserDto) {
    const { role, ...rest } = dto;
    const { user } = await authService.createUser(rest, role);

    return {
      message: "Customer created successfully",
      data: user,
    };
  }

  async updateUser(dto: CUUserDto, userId: string) {
    let hashedPassword = null;

    if (!!dto.password) {
      hashedPassword = await authService.hashPassword(dto.password);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    return { message: "User Updated Successfully" };
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      ...authService.userView,
    });

    return { message: "User Fetched Successfully.", data: user };
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
        ...authService.userView,
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

  async deleteUser(userId: string) {
    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: "User Deleted Successfully." };
  }

  async restoreUser(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: null },
    });

    return { message: "User Restored Successfully." };
  }
}

export const adminService = new AdminService();
