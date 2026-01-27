"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@lib/dashboard/client";
import { parseExpiry } from "@lib/utils/general";

const STALE_TIME = parseExpiry("1h");
const GC_TIME = parseExpiry("2h");

const useDashboard = () => {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    select: (res) => res.data,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export default useDashboard;
