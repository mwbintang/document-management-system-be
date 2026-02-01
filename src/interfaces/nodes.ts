export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface FindAllParams {
  parentId?: number | null;
  search?: string;
  page: number;
  limit: number;
  orderBy?: 
  | "id"
  | "name"
  | "type"
  | "size"
  | "created_at";
  orderDirection?: "ASC" | "DESC";
}

export const ORDER_BY_FIELDS = [
  "id",
  "name",
  "type",
  "size",
  "created_at",
] as const;

export type OrderBy = typeof ORDER_BY_FIELDS[number];

export const ORDER_DIRECTION_FIELDS = [
  "ASC",
  "DESC"
] as const;

export type OrderDirection = typeof ORDER_DIRECTION_FIELDS[number];