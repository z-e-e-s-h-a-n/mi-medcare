import { NextRequest } from "next/server";
import { ZodType } from "zod";

export async function validateBody<T>(
  req: Request,
  schema: ZodType<T>,
): Promise<T> {
  const body = await req.json();
  return schema.parse(body);
}

export function validateQuery<T>(req: Request, schema: ZodType<T>): T {
  const query = Object.fromEntries((req as NextRequest).nextUrl.searchParams);
  return schema.parse(query);
}
