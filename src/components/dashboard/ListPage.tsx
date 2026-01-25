"use client";

import * as React from "react";
import GenericTable, { type ColumnConfig } from "./GenericTable";
import { useConfirm } from "@hooks/use-confirm";
import { ListFilterConfig, SearchByOption } from "./SearchToolbar";

interface UseListResult<TKey extends string, TData> {
  data?: BaseQueryResponse & {
    [K in TKey]: TData[];
  };

  isLoading: boolean;
  isFetching?: boolean;
  error?: unknown;
}

interface ListPageConfig<
  TData extends BaseResponse,
  TQuery extends BaseQueryType,
  TKey extends string,
> {
  entityType: string;
  dataKey: TKey;
  columns: ColumnConfig<TData, TQuery>[];
  searchByOptions: SearchByOption<TQuery>[];

  defaultParams?: TQuery;
  useListHook: (params: TQuery) => UseListResult<TKey, TData>;
  useDeleteHook?: () => {
    remove: (args: { id: string }) => Promise<unknown>;
    isRemoving: boolean;
  };
  defaultSortBy: TQuery["sortBy"];
  defaultSearchBy: TQuery["searchBy"];

  onView?: (item: TData) => string;
  onEdit?: (item: TData) => string;

  filterConfig?: ListFilterConfig<TQuery>;
}

function ListPage<
  TData extends BaseResponse,
  TQuery extends BaseQueryType,
  TKey extends string,
>(config: ListPageConfig<TData, TQuery, TKey>) {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [searchBy, setSearchBy] = React.useState<TQuery["searchBy"]>(
    config.defaultSearchBy,
  );
  const [sortBy, setSortBy] = React.useState<TQuery["sortBy"]>(
    config.defaultSortBy,
  );
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [filter, setFilter] = React.useState<string>();

  const query = {
    ...config.defaultParams,
    page,
    limit,
    search,
    searchBy,
    sortBy,
    sortOrder,
    ...(config.filterConfig && filter
      ? { [config.filterConfig.key]: filter }
      : {}),
  } as unknown as TQuery;

  const { data, isLoading } = config.useListHook(query);
  const deleteHook = config.useDeleteHook?.();
  const confirm = useConfirm();

  const handleDelete = async (row: TData) => {
    if (!deleteHook) return;
    const ok = await confirm();
    if (!ok) return;
    await deleteHook.remove({ id: row.id });
  };

  const entityArr = config.entityType.split("/");
  const entityTitle = entityArr
    .map((e, i) => (i < 1 && entityArr.length > 1 ? e.replace(/s$/, "") : e))
    .join(" ");

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold capitalize">
          {entityTitle} Management
        </h1>
        <p className="text-muted-foreground">
          Manage your {entityTitle} here. View, edit, or delete existing
          records.
        </p>
      </div>
      <GenericTable
        {...config}
        data={data?.[config.dataKey] || []}
        total={data?.total || 0}
        limit={data?.limit || 10}
        currentPage={data?.page || 1}
        totalPages={data?.totalPages || 1}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setPage={setPage}
        setLimit={setLimit}
        onDelete={handleDelete}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}

export default ListPage;
