"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontal, ArrowUpDown, Trash2, Eye, Edit } from "lucide-react";

import { Button } from "@components/ui//button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui//dropdown-menu";
import Pagination, { PaginationProps } from "./Pagination";
import SearchToolbar, { SearchToolbarProps } from "./SearchToolbar";
import TableSkeleton from "../skeleton/TableSkeleton";

export interface ColumnConfig<TData, TQuery extends BaseQueryType> {
  header: string;
  accessor: keyof TData | ((row: TData) => React.ReactNode);
  sortKey?: TQuery["sortBy"];
  className?: string;
}

interface GenericTableProps<
  TData extends BaseResponse,
  TQuery extends BaseQueryType,
>
  extends Omit<SearchToolbarProps<TQuery>, "setPage">, PaginationProps {
  data: TData[];
  isFetching?: boolean;

  columns: ColumnConfig<TData, TQuery>[];

  onView?: (row: TData) => string;
  onEdit?: (row: TData) => string;
  onDelete?: (row: TData) => Promise<void> | void;
}

function GenericTable<
  TData extends BaseResponse,
  TQuery extends BaseQueryType,
>({
  data,
  total,
  limit,
  currentPage,
  totalPages,
  isFetching = false,
  entityType,
  columns,
  searchByOptions,
  search,
  setSearch,
  searchBy,
  setSearchBy,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  setPage,
  setLimit,
  onView = (row) => `/${entityType}/${row.id}`,
  onEdit = (row) => `/${entityType}/${row.id}/edit`,
  onDelete,
  filter,
  setFilter,
  filterConfig,
}: GenericTableProps<TData, TQuery>) {
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleSort = (col: ColumnConfig<TData, TQuery>) => {
    if (!col.sortKey) return;

    if (sortBy === col.sortKey) {
      setSortOrder?.(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy?.(col.sortKey);
      setSortOrder?.("desc");
    }
  };

  const handleDelete = async (row: TData) => {
    if (!onDelete) return;
    try {
      setDeletingId(row.id);
      await onDelete(row);
    } finally {
      setDeletingId(null);
    }
  };

  if (isFetching) {
    return <TableSkeleton columnCount={columns.length} rowCount={limit} />;
  }

  return (
    <section className="space-y-4">
      {/* FILTER BAR */}
      <SearchToolbar
        entityType={entityType}
        search={search}
        setSearch={setSearch}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        setPage={setPage}
        searchByOptions={searchByOptions}
        filter={filter}
        setFilter={setFilter}
        filterConfig={filterConfig}
      />

      {/* TABLE */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {columns.map((c, i) => (
                <TableHead key={i} className={c.className}>
                  {c.sortKey ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(c)}
                      className="px-0"
                    >
                      {c.header}
                      <ArrowUpDown className="ml-1 size-4" />
                    </Button>
                  ) : (
                    c.header
                  )}
                </TableHead>
              ))}
              <TableHead className="w-20 sticky right-0 bg-muted z-20">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {data.length ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((c, i) => (
                    <TableCell key={i} className={c.className}>
                      {typeof c.accessor === "function"
                        ? c.accessor(row)
                        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          ((row as any)[c.accessor] ?? "N/A")}
                    </TableCell>
                  ))}

                  <TableCell className="sticky right-0 bg-background z-20">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={onView(row)}>
                            <Eye className="mr-2 size-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={onEdit(row)}>
                            <Edit className="mr-2 size-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        {onDelete && (
                          <DropdownMenuItem
                            onClick={() => handleDelete(row)}
                            disabled={deletingId === row.id}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 size-4" />
                            {deletingId === row.id ? "Deleting..." : "Delete"}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* PAGINATION */}
      <Pagination
        total={total}
        limit={limit}
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
        setLimit={setLimit}
      />
    </section>
  );
}

export default GenericTable;
