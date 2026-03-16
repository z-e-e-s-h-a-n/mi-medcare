"use client";

import { useQuery } from "@tanstack/react-query";
import type {
  TrafficSourceQueryResponse,
  TrafficSourceQueryType,
  TrafficSourceResponse,
} from "@workspace/contracts/traffic";
import type { ApiException } from "@workspace/sdk";
import * as traffic from "@workspace/sdk/traffic";
import { parseDuration } from "@workspace/shared/utils";

const STALE_TIME = parseDuration("15m");

const queryDefaults = {
  staleTime: STALE_TIME,
  gcTime: STALE_TIME,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false,
};

type QueryResult<T> = {
  data?: T;
  isLoading: boolean;
  isFetching: boolean;
  fetchError: ApiException | null;
};

export function useTrafficSources(
  params: TrafficSourceQueryType,
): QueryResult<TrafficSourceQueryResponse> {
  const query = useQuery({
    queryKey: ["trafficSources", params],
    queryFn: () => traffic.getTrafficSources(params),
    select: (res) => res.data,
    placeholderData: (prev) => prev,
    ...queryDefaults,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchError: query.error as ApiException | null,
  };
}

export function useTrafficSource(id?: string): QueryResult<TrafficSourceResponse> {
  const query = useQuery({
    queryKey: ["trafficSource", id],
    queryFn: () => traffic.getTrafficSource(id!),
    select: (res) => res.data,
    enabled: Boolean(id),
    ...queryDefaults,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchError: query.error as ApiException | null,
  };
}
