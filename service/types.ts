import { CSSProperties, ReactNode } from "react";

export interface IPaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  total?: boolean;
}

export type InfinityPaginationResultType<T> = Readonly<{
  data: T[];
  total?: number;
  hasNextPage: boolean;
}>;

export interface Column<T> {
  name: string;
  label: string;
  filed: (row: T) => ReactNode;
  styled?: CSSProperties | ((row: T) => CSSProperties);
  classes?: string | ((row: T) => string);
}
export interface TableAction<T> {
  name: string;
  icon: ReactNode;
  handler: (row: T) => void;
}
