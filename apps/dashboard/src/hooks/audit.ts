"use client";

import { useQuery } from "@tanstack/react-query";
import type {
  AuditLogQueryResponse,
  AuditLogQueryType,
  AuditLogResponse,
} from "@workspace/contracts/audit";
import type { ApiException } from "@workspace/sdk";
import * as audit from "@workspace/sdk/audit";
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

export function useAuditLogs(
  params: AuditLogQueryType,
): QueryResult<AuditLogQueryResponse> {
  const query = useQuery({
    queryKey: ["auditLogs", params],
    queryFn: () => audit.getAuditLogs(params),
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

export function useAuditLog(id?: string): QueryResult<AuditLogResponse> {
  const query = useQuery({
    queryKey: ["auditLog", id],
    queryFn: () => audit.getAuditLog(id!),
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
