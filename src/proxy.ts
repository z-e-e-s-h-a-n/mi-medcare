import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokenService } from "@/lib/auth/token.service";
import { AUTH_ERRORS, redirectWithAuthError } from "@lib/http/handle-redirect";
import { serverEnv } from "@lib/core/server-env";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";

type RoutePolicy = {
  route: string;
  publicMethods?: HTTPMethod[];
  roles?: UserRole[];
};

const ROUTE_POLICIES: RoutePolicy[] = [
  { route: "/api/admin", roles: ["admin"] },
  { route: "/dashboard", roles: ["admin", "author", "editor"] },
  { route: "/dashboard/admin", roles: ["admin"] },

  { route: "/api/user" },
  { route: "/api/dashboard" },
  { route: "/api/auth/signout" },
  { route: "/api/auth/change-email", publicMethods: ["GET"] },
  { route: "/api/posts", publicMethods: ["GET"] },
  { route: "/api/categories", publicMethods: ["GET"] },
  { route: "/api/tags", publicMethods: ["GET"] },
  { route: "/api/media", publicMethods: ["GET"] },
];

export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const method = req.method as HTTPMethod;

  const origin = req.headers.get("origin");
  const isAllowedOrigin = origin && serverEnv.CORS_ORIGIN.includes(origin);

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "null",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const policy = [...ROUTE_POLICIES]
    .sort((a, b) => b.route.length - a.route.length)
    .find((p) => pathname.startsWith(p.route));

  if (!policy || policy.publicMethods?.includes(method)) {
    const res = NextResponse.next();
    if (isAllowedOrigin) {
      res.headers.set("Access-Control-Allow-Origin", origin!);
      res.headers.set("Access-Control-Allow-Credentials", "true");
    }
    return res;
  }

  try {
    const decoded = await tokenService.verifyToken(req, "accessToken");
    if (policy.roles && !policy.roles.includes(decoded.role)) {
      return redirectWithAuthError(req, "/dashboard", AUTH_ERRORS.FORBIDDEN);
    }

    const res = NextResponse.next();
    if (isAllowedOrigin) {
      res.headers.set("Access-Control-Allow-Origin", origin!);
      res.headers.set("Access-Control-Allow-Credentials", "true");
    }
    return res;
  } catch {
    try {
      const decoded = await tokenService.verifyToken(req, "refreshToken");
      await tokenService.refreshTokens(req, decoded);

      const res = NextResponse.next();
      if (isAllowedOrigin) {
        res.headers.set("Access-Control-Allow-Origin", origin!);
        res.headers.set("Access-Control-Allow-Credentials", "true");
      }
      return res;
    } catch {
      return redirectWithAuthError(
        req,
        "/auth/sign-in",
        AUTH_ERRORS.UNAUTHORIZED,
      );
    }
  }
};

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
