import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokenService } from "@/lib/auth/token.service";
import { AUTH_ERRORS, redirectWithAuthError } from "@lib/http/handle-redirect";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

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

  const policy = [...ROUTE_POLICIES]
    .sort((a, b) => b.route.length - a.route.length)
    .find((p) => pathname.startsWith(p.route));

  if (!policy) return NextResponse.next();
  if (policy.publicMethods?.includes(method)) return NextResponse.next();

  try {
    const decoded = await tokenService.verifyToken(req, "accessToken");
    if (policy.roles && !policy.roles.includes(decoded.role)) {
      return redirectWithAuthError(req, "/dashboard", AUTH_ERRORS.FORBIDDEN);
    }

    return NextResponse.next();
  } catch {
    try {
      const decoded = await tokenService.verifyToken(req, "refreshToken");
      await tokenService.refreshTokens(req, decoded);
      return NextResponse.next();
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
