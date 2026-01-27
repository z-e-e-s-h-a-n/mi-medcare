import { authService } from "@lib/auth/auth.service";
import { tokenService } from "@lib/auth/token.service";
import prisma from "@lib/core/prisma";
import { NextRequest } from "next/server";

class UserService {
  async getCurrentUser(req: NextRequest) {
    const userId = (await tokenService.getDecodeUser(req))?.id;
    const { user } = await authService.findUserFail404(userId, { id: userId });

    return {
      message: "User Fetched Successfully.",
      data: user,
    };
  }

  async updateUserProfile(dto: UserProfileDto, req: NextRequest) {
    const userId = (await tokenService.getDecodeUser(req))?.id;
    await prisma.user.update({
      where: { id: userId },
      data: dto,
    });

    return {
      message: "Profile Updated Successfully.",
    };
  }
}

export const userService = new UserService();
