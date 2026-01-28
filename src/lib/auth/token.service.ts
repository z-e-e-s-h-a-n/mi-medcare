import { SignJWT, jwtVerify } from "jose";
import prisma from "@lib/core/prisma";
import { serverEnv } from "@lib/core/server-env";
import { expiryDate } from "@lib/utils/general";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { UnauthorizedException } from "@lib/http/http-exception";

export interface JwtPayload extends Record<string, string> {
  id: string;
  role: UserRole;
}

export interface TokensType {
  accessToken: string;
  refreshToken: string;
  tokenId: string;
}

class TokenService {
  private readonly accessSecret = new TextEncoder().encode(
    serverEnv.JWT_ACCESS_SECRET!,
  );
  private readonly refreshSecret = new TextEncoder().encode(
    serverEnv.JWT_REFRESH_SECRET!,
  );

  async generateTokens(
    req: NextRequest,
    jwtPayload: JwtPayload,
  ): Promise<TokensType> {
    const [accessToken, refreshToken] = await Promise.all([
      new SignJWT(jwtPayload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(serverEnv.ACCESS_TOKEN_EXP)
        .sign(this.accessSecret),
      new SignJWT(jwtPayload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(serverEnv.REFRESH_TOKEN_EXP)
        .sign(this.refreshSecret),
    ]);

    const tokenId = req.cookies.get("tokenId")?.value ?? "undefined";
    const refreshExp = expiryDate(serverEnv.REFRESH_TOKEN_EXP, true);

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "Unknown";
    const userAgent = req.headers.get("user-agent") ?? "Unknown";

    const tokenData = {
      token: refreshToken,
      userId: jwtPayload.id,
      ip,
      userAgent,
      lastUsed: new Date(),
      blacklisted: false,
      expiresAt: refreshExp,
    };

    const newToken = await prisma.refreshToken.upsert({
      where: { id: tokenId },
      update: tokenData,
      create: tokenData,
    });

    return { accessToken, refreshToken, tokenId: newToken.id };
  }

  async verifyToken(
    req: NextRequest,
    type: "refreshToken" | "accessToken",
  ): Promise<JwtPayload> {
    const token = req.cookies.get(type)?.value;

    const secret =
      type === "accessToken" ? this.accessSecret : this.refreshSecret;

    if (!token && type === "accessToken") {
      throw new Error("Access token is missing or expired");
    } else if (!token) {
      throw new UnauthorizedException("Refresh token is missing");
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      return payload as JwtPayload;
    } catch {
      throw new UnauthorizedException(`Invalid or expired ${token}`);
    }
  }

  async getDecodeUser(req: NextRequest) {
    const decoded = await this.verifyToken(req, "accessToken");
    return decoded;
  }

  async refreshTokens(req: NextRequest, jwtPayload: JwtPayload) {
    const tokenId = req.cookies.get("tokenId")?.value;
    const token = req.cookies.get("refreshToken")?.value;

    if (!tokenId || !token) {
      throw new UnauthorizedException("Missing refresh session");
    }

    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { id: tokenId },
    });

    if (
      !tokenRecord ||
      tokenRecord.blacklisted ||
      tokenRecord.token !== token ||
      tokenRecord.expiresAt < new Date()
    ) {
      throw new UnauthorizedException("Invalid refresh session");
    }

    await this.createAuthSession(req, jwtPayload);
  }

  async createAuthSession(req: NextRequest, jwtPayload: JwtPayload) {
    const tokens = await this.generateTokens(req, jwtPayload);
    await this.setAuthCookies(tokens);
    return tokens;
  }

  async setAuthCookies(tokens: TokensType) {
    const { accessToken, refreshToken, tokenId } = tokens;
    const accessExp = expiryDate(serverEnv.ACCESS_TOKEN_EXP, true);
    const refreshExp = expiryDate(serverEnv.REFRESH_TOKEN_EXP, true);

    const defaultOptions: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "strict";
      path: string;
    } = {
      httpOnly: true,
      secure: serverEnv.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    };

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      ...defaultOptions,
      expires: accessExp,
    });
    cookieStore.set("refreshToken", refreshToken, {
      ...defaultOptions,
      expires: refreshExp,
    });
    cookieStore.set("tokenId", tokenId, {
      ...defaultOptions,
      expires: refreshExp,
    });
  }

  async clearAuthCookies() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const tokenId = cookieStore.get("tokenId")?.value;

    if (refreshToken && tokenId) {
      await prisma.refreshToken.updateMany({
        where: { id: tokenId, token: refreshToken },
        data: { blacklisted: true },
      });
    }

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("tokenId");
  }
}

export const tokenService = new TokenService();
