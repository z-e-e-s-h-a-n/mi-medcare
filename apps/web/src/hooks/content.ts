"use client";

import { useQuery } from "@tanstack/react-query";
import type {
  PostQueryType,
  CategoryQueryType,
  TagQueryType,
} from "@workspace/contracts/content";
import { getPosts, getCategories, getTags } from "@workspace/sdk/content";

const STALE_TIME = 60 * 60 * 1000;

export const useCategories = (params?: CategoryQueryType) => {
  const query = useQuery({
    queryKey: ["categories", params],
    queryFn: async () => getCategories(params),
    placeholderData: (data) => data,
    select: (res) => res.data,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
};

export const useTags = (params?: TagQueryType) => {
  const query = useQuery({
    queryKey: ["tags", params],
    queryFn: async () => getTags(params),
    placeholderData: (data) => data,
    select: (res) => res.data,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
};

export const usePosts = (params?: PostQueryType) => {
  const query = useQuery({
    queryKey: ["posts", params],
    queryFn: async () => getPosts(params),
    placeholderData: (data) => data,
    select: (res) => res.data,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
};
