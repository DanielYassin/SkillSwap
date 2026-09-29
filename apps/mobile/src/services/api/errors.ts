import type { ApiErrorBody } from '@skillswap/shared';

export class ApiError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  if (!('error' in value)) {
    return false;
  }
  const error = (value as { error: unknown }).error;
  if (typeof error !== 'object' || error === null) {
    return false;
  }
  return typeof (error as { message?: unknown }).message === 'string';
}

export async function parseApiError(response: Response): Promise<ApiError> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return new ApiError(
      response.statusText || `Request failed with status ${response.status}`,
      response.status,
    );
  }

  if (isApiErrorBody(body)) {
    return new ApiError(body.error.message, response.status, body.error.details);
  }

  return new ApiError(
    `Request failed with status ${response.status}`,
    response.status,
    body,
  );
}
