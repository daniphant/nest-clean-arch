export type PaginatedResponse<PropertyName extends string, T> = {
  total: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
} & { [P in PropertyName]: T };
