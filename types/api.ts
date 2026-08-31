/**
 * Shared API envelope types.
 *
 * Mirrors the standard envelope and error catalogue already fixed in
 * 04-api-specification.md §1.4/§12 (referenced transitively via
 * 01-frontend-architecture.md §6.1). This file defines *shapes* only —
 * no fetching logic, no backend implementation.
 */

export interface ApiSuccessEnvelope<T> {
  data: T;
  meta?: {
    nextCursor?: string;
    hasMore?: boolean;
    [key: string]: unknown;
  };
}

/**
 * The error code catalogue this frontend is built against
 * (01-frontend-architecture.md §6.2). This list is intentionally the
 * exact set already locked upstream — no new codes are introduced here.
 */
export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_CREDENTIALS"
  | "EMAIL_NOT_VERIFIED"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "DUPLICATE_OPEN_REQUEST"
  | "DAILY_QUOTA_EXCEEDED"
  | "MONTHLY_QUOTA_EXCEEDED"
  | "INSUFFICIENT_CREDITS"
  | "FEATURE_DISABLED"
  | "CONFIG_ERROR"
  | "PROVIDER_ERROR"
  | "PROVIDER_TIMEOUT"
  | "MODERATION_BLOCKED"
  | "INVALID_COUPON"
  | "COUPON_STACKING_NOT_ALLOWED"
  | "CROSS_REGION_NOT_ALLOWED"
  | "RATE_LIMITED"
  | "IDEMPOTENCY_KEY_CONFLICT"
  | "EMAIL_ALREADY_REGISTERED"
  | "TOKEN_EXPIRED"
  | "TOKEN_INVALID";

export interface ApiErrorDetails {
  fields?: { field: string; issue: string }[];
  retryAfterSeconds?: number;
  [key: string]: unknown;
}

export interface ApiErrorBody {
  code: ApiErrorCode;
  message: string;
  details?: ApiErrorDetails;
  requestId: string;
}

export interface ApiErrorEnvelope {
  error: ApiErrorBody;
}

/**
 * Thrown by the API client (lib/api-client.ts) for every non-2xx response.
 * Every UI error branch matches on `.code`, never on raw HTTP status alone
 * (01-frontend-architecture.md §6.1).
 */
export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly details?: ApiErrorDetails;
  public readonly requestId: string;
  public readonly httpStatus: number;

  constructor(body: ApiErrorBody, httpStatus: number) {
    super(body.message);
    this.name = "ApiError";
    this.code = body.code;
    this.details = body.details;
    this.requestId = body.requestId;
    this.httpStatus = httpStatus;
  }
}
