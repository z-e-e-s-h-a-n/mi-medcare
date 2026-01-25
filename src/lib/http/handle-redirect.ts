import { NextRequest, NextResponse } from "next/server";

export const AUTH_ERRORS = {
    UNAUTHORIZED: {
        code: "unauthorized",
        message: "Please sign in to continue",
    },
    FORBIDDEN: {
        code: "forbidden",
        message: "You do not have permission to access this resource",
    },
    SESSION_EXPIRED: {
        code: "session-expired",
        message: "Your session has expired. Please sign in again",
    },
} as const;



export function redirectWithAuthError(
    req: NextRequest,
    path: string,
    error: (typeof AUTH_ERRORS)[keyof typeof AUTH_ERRORS]
) {
    const url = new URL(path, req.url);
    url.searchParams.set("error", error.code);
    url.searchParams.set("message", error.message);
    return NextResponse.redirect(url);
}
