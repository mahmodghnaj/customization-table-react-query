import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  ComponentProps,
  TableHandle,
  propTypesAction,
  propTypesClassName,
  propTypesColumn,
  propTypesFetchQuery,
  propTypesFilter,
  propTypesShowFooter,
  propTypesStickyActions,
  propTypesSyncRoute,
} from "./type";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { updateUrlWithObjectQueries } from "@/utils/helper";
import { IPaginationOptions } from "@/service/types";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import Footer from "./components/footer";
import Body from "./components/body";
import Header from "./components/header";
import BodyLoading from "./components/body-loading";

type IBaseParams = Omit<IPaginationOptions, "total">;

const baseParams: IBaseParams = {
  page: 1,
  limit: 10,
  sortOrder: undefined,
  sortBy: undefined,
};

const Table = forwardRef<HTMLTableElement, ComponentProps>(
  (
    {
      columns,
      fetchQuery,
      syncRoute,
      filter,
      className,
      showFooter,
      stickyActions,
      actions,
    },
    ref
  ) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [params, setParams] = useState<IBaseParams>(() => {
      const updatedParams: any = { ...baseParams, ...filter };
      if (syncRoute) {
        searchParams.forEach((value, key) => {
          if (updatedParams.hasOwnProperty(key)) {
            updatedParams[key] = value;
          }
        });
      }
      return updatedParams;
    });
    const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

    const { isLoading, data, isError, dataUpdatedAt } = fetchQuery({
      ...params,
      ...filter,
      total: true,
    });

    useEffect(() => {
      if (data && data.total) {
        setTotalPages(Math.ceil(data.total / params.limit));
      }
    }, [data, params.limit, totalPages]);

    useEffect(() => {
      if (syncRoute && filter) {
        const url = updateUrlWithObjectQueries(
          { ...params, ...filter },
          router.asPath
        );
        window.history.replaceState(window.history.state, "", url);
      }
    }, [filter]);

    const handleLimitChange = (pageNumber: number) => {
      setParams({
        ...params,
        limit: pageNumber,
        page: 1,
      });
      asyncWithRoute({ limit: pageNumber, page: 1 });
    };

    const handleChangeParams = (object: object) => {
      setParams((prevParams) => ({
        ...prevParams,
        ...object,
      }));
      asyncWithRoute(object);
    };

    const handleSortChange = (columnName: string) => {
      const sortOrder =
        params.sortBy === columnName
          ? params.sortOrder === "asc"
            ? "desc"
            : "asc"
          : "asc";
      setParams({
        ...params,
        sortBy: columnName,
        sortOrder,
        page: 1,
      });
      asyncWithRoute({ sortBy: columnName, sortOrder, page: 1 });
    };

    const asyncWithRoute = (object: object) => {
      if (syncRoute) {
        const url = updateUrlWithObjectQueries(
          { ...params, ...object },
          router.asPath
        );
        window.history.replaceState(
          { ...window.history.state, as: url, url: url },
          "",
          url
        );
      }
    };

    const classes = twMerge(
      "overflow-auto overflow-x-auto table-scroll h-96",
      classNames(className)
    );
    const classesTable = twMerge(
      "table table-xs table-pin-rows table-zebra",
      classNames({ "table-pin-cols": stickyActions })
    );

    if (isError) {
      return <div>Error loading data</div>;
    }

    return (
      <>
        <div className={classes}>
          <table ref={ref} className={classesTable}>
            <Header
              actions={actions}
              columns={columns}
              sortBy={params.sortBy}
              handleSortChange={handleSortChange}
              sortOrder={params.sortOrder}
            />
            {isLoading && !data && (
              <BodyLoading columns={columns} limit={params.limit} />
            )}
            {!isLoading && data && (
              <Body
                actions={actions}
                data={data.data}
                columns={columns}
                showFooter={showFooter}
              />
            )}
          </table>
        </div>
        <Footer
          limit={params.limit}
          handleLimitChange={handleLimitChange}
          totalPages={totalPages}
          handleChangeParams={handleChangeParams}
          page={params.page}
        />
      </>
    );
  }
);

Table.displayName = "Table";

Table.propTypes = {
  columns: propTypesColumn,
  fetchQuery: propTypesFetchQuery,
  syncRoute: propTypesSyncRoute,
  filter: propTypesFilter,
  className: propTypesClassName,
  showFooter: propTypesShowFooter,
  stickyActions: propTypesStickyActions,
  actions: propTypesAction,
};

export default Table;
