
export type PaginationType<T> = T & {page: number, limit: number}

export type PaginationResponse<T> = {
  data: T;
  page: number;
  limit: number;
  total: number;
  totalPages: number
}