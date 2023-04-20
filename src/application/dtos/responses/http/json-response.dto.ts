import { PaginatedResponse } from 'domain/interfaces/contracts/paginated.interface';

export interface IJsonResponse<T> {
  statusCode: number | string;
  message: string;
  data: T | null;
  error: unknown | unknown[] | null;
}

export type JsonResponse<PNameOrPaginated, T = undefined> = {
  statusCode: number | string;
  message: string;
  data:
    | (PNameOrPaginated extends PaginatedResponse<string, unknown>
        ? PNameOrPaginated
        : PNameOrPaginated extends string
        ? { [P in PNameOrPaginated]: T }
        : never)
    | null;
  error: unknown | unknown[] | null;
};
