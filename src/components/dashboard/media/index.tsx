"use client";

import { useMedias } from "@hooks/media";
import SearchToolbar from "@components/dashboard/SearchToolbar";
import { MediaGrid } from "./MediaGrid";
import Pagination from "@components/dashboard/Pagination";
import { useState } from "react";

interface MediaLibraryProps {
  selectable?: boolean;
  onSelect?: (media: MediaResponse) => void;
}

function MediaLibrary({ selectable, onSelect }: MediaLibraryProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] =
    useState<MediaQueryType["searchBy"]>("filename");
  const [sortBy, setSortBy] = useState<MediaQueryType["sortBy"]>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState<string>();

  const { data, isLoading } = useMedias({
    page,
    limit,
    search,
    searchBy,
    sortBy,
    sortOrder,
  });

  return (
    <section className="space-y-6">
      <SearchToolbar<MediaQueryType>
        entityType={"dashboard/media"}
        search={search}
        setPage={setPage}
        setSearch={setSearch}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        filter={filter}
        setFilter={setFilter}
        setSortOrder={setSortOrder}
        searchByOptions={[
          { label: "Filename", value: "filename" },
          { label: "ID", value: "id" },
        ]}
        // filterConfig={}
      />

      <MediaGrid
        medias={data?.medias ?? []}
        isLoading={isLoading}
        selectable={selectable}
        onSelect={onSelect}
      />

      {data && (
        <Pagination
          total={data.total}
          limit={limit}
          currentPage={page}
          totalPages={data.totalPages}
          setLimit={setLimit}
          setPage={setPage}
        />
      )}
    </section>
  );
}

export default MediaLibrary;
