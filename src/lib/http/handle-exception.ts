// server/lib/http/handle-exception.ts
import { NextResponse } from "next/server";
import { Prisma } from "@generated/prisma";
import { ZodError } from "zod";
import { HttpException } from "./http-exception";

export function handleException(error: unknown) {
  let status = 500;
  let message = "Internal server error";
  let data: unknown = null;
  let action: string | undefined;

  // -------- Nest-style exceptions --------
  if (error instanceof HttpException) {
    status = error.status;
    message = error.message;
    data = error.data ?? null;
    action = error.action;
  }

  // -------- Prisma ClientKnownRequestError --------
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        status = 409;
        const target = Array.isArray(error.meta?.target)
          ? error.meta?.target.join(", ")
          : String(error.meta?.target ?? "");
        message = `Duplicate entry${target ? `: ${target}` : ""}`;
        break;
      case "P2025":
        status = 404;
        message = "Resource not found";
        break;
      case "P2003":
        status = 400;
        message = "Foreign key constraint failed";
        break;
      case "P2016":
        status = 400;
        message = "Query interpretation error";
        break;
      case "P2011":
        status = 400;
        message = "Null constraint violation";
        break;
      case "P2012":
        status = 400;
        message = "Missing required value";
        break;
      case "P2014":
        status = 400;
        message = "Invalid relation operation";
        break;
      case "P2001":
        status = 404;
        message = "Record does not exist";
        break;
      default:
        status = 400;
        message = "Database operation failed";
    }
  }

  // -------- Prisma Validation Error --------
  else if (error instanceof Prisma.PrismaClientValidationError) {
    status = 400;
    const errorMessage = error.message;

    if (errorMessage.includes("Unknown argument")) {
      const match = errorMessage.match(/Unknown argument `(\w+)`/);
      if (match) {
        message = `Invalid field: ${match[1]} is not a valid field for this operation`;
      } else {
        message = "Invalid data provided for database operation";
      }
    } else if (errorMessage.includes("Invalid value")) {
      message = "Invalid data format provided";
    } else {
      message = "Database validation failed";
    }
  }

  // -------- Prisma Unknown Request Error --------
  else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    status = 400;
    message = "Database request error";

    if (process.env.NODE_ENV === "development") {
      data = { detail: error.message };
    }
  }

  // -------- Prisma Initialization Error --------
  else if (error instanceof Prisma.PrismaClientInitializationError) {
    status = 500;
    message = "Database connection failed";

    if (process.env.NODE_ENV === "development") {
      data = { detail: error.message };
    }
  }

  // -------- Prisma Rust Panic Error --------
  else if (error instanceof Prisma.PrismaClientRustPanicError) {
    status = 500;
    message = "Database engine error";

    if (process.env.NODE_ENV === "development") {
      data = { detail: error.message };
    }
  }

  // -------- Zod --------
  else if (error instanceof ZodError) {
    status = 400;
    message = "Validation failed";
    data = error.issues.map((i) => ({
      field: i.path.join("."),
      message: i.message,
      code: i.code,
    }));
  }

  // -------- Generic Error --------
  else if (error instanceof Error) {
    message = "An unexpected error occurred";

    if (process.env.NODE_ENV === "development") {
      data = { detail: error.message };
    }
  }

  return NextResponse.json(
    {
      status,
      success: false,
      message,
      data,
      action,
    },
    { status },
  );
}