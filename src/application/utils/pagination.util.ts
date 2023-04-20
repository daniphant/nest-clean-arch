import { PaginationOptions } from 'domain/interfaces/contracts/pagination-options.interface';

export const paginatedStaticDataFromTotal = (
  total: number,
  dto: PaginationOptions<unknown>,
) => {
  return {
    total: total as number,
    totalPages: Math.ceil(total / dto.limit),
    nextPage:
      dto.page + 1 <= Math.ceil(total / dto.limit) ? dto.page + 1 : null,
    previousPage: dto.page - 1 > 0 ? dto.page - 1 : null,
  };
};
