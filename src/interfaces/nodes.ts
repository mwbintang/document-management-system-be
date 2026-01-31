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