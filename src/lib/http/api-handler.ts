import { NextRequest, NextResponse } from "next/server";
import { handleException } from "./handle-exception";

export function withApiHandler<T extends Record<string, unknown>>(
  handler: (
    req: NextRequest,
    ctx?: { params?: Record<string, string> },
  ) => Promise<({ message?: string; data?: unknown } | T) | void>,
) {
  return async (req: NextRequest, ctx?: { params?: Record<string, string> }) => {
    try {
      const result = await handler(req, ctx);

      const { message, data, ...meta } = result || {};

      return NextResponse.json(
        {
          status: 200,
          success: true,
          message: message ?? "Success",
          data: data ?? null,
          ...(Object.keys(meta).length ? { meta } : {}),
        },
        { status: 200 },
      );
    } catch (error: unknown) {
      console.log("error recived", error);
      return handleException(error);
    }
  };
}
