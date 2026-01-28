"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@lib/dashboard/client";
import { parseExpiry } from "@lib/utils/general";

const STALE_TIME = parseExpiry("1h");

const useDashboard = () => {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    select: (res) => res.data,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchError: query.error,
    refetch: query.refetch,
  };
};

export default useDashboard;
