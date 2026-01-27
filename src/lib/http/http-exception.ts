export class HttpException extends Error {
  status: number;
  data?: unknown;
  action?: string;

  constructor(
    message: string,
    status: number,
    options?: { data?: unknown; action?: AuthActions },
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.data = options?.data ?? null;
    this.action = options?.action;
  }
}

export class BadRequestException extends HttpException {
  constructor(message = "Bad request", data?: unknown) {
    super(message, 400, { data });
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized", action?: AuthActions) {
    super(message, 401, { action });
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ApiException extends Error {
  status: number;
  data: unknown | null;
  action?: string;

  constructor(payload: {
    message?: string;
    status?: number;
    data?: unknown;
    action?: string;
  }) {
    super(payload.message ?? "API Error");
    this.name = "ApiException";
    this.status = payload.status ?? 0;
    this.data = payload.data ?? null;
    this.action = payload.action;
  }
}
