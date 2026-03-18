"use client";

import { useQuery } from "@tanstack/react-query";
import type { PostQueryType, PostResponse } from "@workspace/contracts/content";
import { getPosts } from "@workspace/sdk/content";

const STALE_TIME = 60 * 60 * 1000;

export function usePosts(params?: PostQueryType) {
  const query = useQuery({
    queryKey: ["posts", params],
    queryFn: async () => {
      const response = await getPosts(params);
      console.log("response", response);

      return response.data?.posts ?? [];
    },
    initialData: [] as PostResponse[],
    placeholderData: (data) => data,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
  });

  console.log("query.data", query.data);

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
