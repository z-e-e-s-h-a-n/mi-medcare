import { NextRequest, NextResponse } from "next/server";
import { handleException } from "./handle-exception";

type ApiContext = {
  getParam: (key: string) => Promise<string>;
};

export function withApiHandler<T extends Record<string, unknown>>(
  handler: (
    req: NextRequest,
    ctx: ApiContext,
  ) => Promise<({ message?: string; data?: unknown } | T) | void>,
) {
  return async (
    req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> },
  ) => {
    try {
      const apiCtx: ApiContext = {
        async getParam(key: string) {
          const params = await ctx?.params;
          const value = params?.[key];
          if (!value) {
            throw new Error(`${key} is required`);
          }
          return value;
        },
      };

      const result = await handler(req, apiCtx);

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
    } catch (error) {
      return handleException(error);
    }
  };
}
