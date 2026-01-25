"use client";
import { getCurrentUser } from "@lib/auth/client";
import { parseExpiry } from "@lib/utils/general";
import { useQuery } from "@tanstack/react-query";

const SLATE_TIME = parseExpiry("15m");

const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    select: (res) => res.data,
    staleTime: SLATE_TIME,
    gcTime: SLATE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return { currentUser: data, isLoading, isError };
};

export default useAuth;
