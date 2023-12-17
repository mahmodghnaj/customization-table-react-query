import { UseQueryResult } from "react-query";
import PropTypes from "prop-types";
import { Column, IPaginationOptions, TableAction } from "@/service/types";

export const propTypesColumn: any = PropTypes.array.isRequired;
export const propTypesFetchQuery: any = PropTypes.func.isRequired;
export const propTypesSyncRoute: any = PropTypes.bool;
export const propTypesFilter: any = PropTypes.object;
export const propTypesClassName: any = PropTypes.string;
export const propTypesShowFooter: any = PropTypes.bool;
export const propTypesStickyActions: any = PropTypes.bool;
export const propTypesAction: any = PropTypes.array;

interface QueryDataResponseType<T> {
  data: T[];
  total?: number;
}

export interface PaginationProps extends React.ComponentProps<"div"> {
  totalPages: number;
  page: number;
  handlePageChange: (object: object) => void;
}

export interface FooterProps extends React.ComponentProps<"div"> {
  limit: number;
  handleLimitChange: (value: number) => void;
  totalPages: number | undefined;
  page: number;
  handleChangeParams: (object: object) => void;
}

export interface BodyProps extends React.ComponentProps<"tbody"> {
  data: any[];
  columns: Column<any>[];
  actions: TableAction<any>[] | undefined;
  showFooter: boolean | undefined;
}

export interface BodyLoadingPros extends React.ComponentProps<"tbody"> {
  columns: Column<any>[];
  limit: number;
}

export interface HeaderProps extends React.ComponentProps<"thead"> {
  columns: Column<any>[];
  actions: TableAction<any>[] | undefined;
  handleSortChange: (val: string) => void;
  sortBy?: string;
  sortOrder?: string;
}

export interface ComponentProps extends React.ComponentProps<"table"> {
  columns: Column<any>[];
  fetchQuery: (
    params: IPaginationOptions
  ) => UseQueryResult<QueryDataResponseType<any>, any>;
  syncRoute?: boolean;
  filter?: object;
  className?: string;
  showFooter?: boolean;
  stickyActions?: boolean;
  actions?: TableAction<any>[];
}
