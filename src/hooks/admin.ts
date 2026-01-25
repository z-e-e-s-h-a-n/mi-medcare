"use client";

import { findAllUsers, createUser } from "@lib/admin/client";
import { parseExpiry } from "@lib/utils/general";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const STALE_TIME = parseExpiry("15m");
const GC_TIME = parseExpiry("30m");

const useAdmin = (params?: UserQueryType) => {
  const queryClient = useQueryClient();

  /* -------------------------------------------
   * FETCH USERS
   * ------------------------------------------- */
  const usersQuery = useQuery({
    queryKey: ["users", params],
    queryFn: () => findAllUsers(params),
    select: (res) => res.data,
    placeholderData: (prev) => prev,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });


  /* -------------------------------------------
   * CREATE USER
   * ------------------------------------------- */
  const createCustomerMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    data: usersQuery.data,
    isLoading: usersQuery.isLoading,
    isFetching: usersQuery.isFetching,
    isError: usersQuery.isError,
    error: usersQuery.error,
    createUser: createCustomerMutation.mutateAsync,
    isCreatingUser: createCustomerMutation.isPending,
  };
};

export default useAdmin;
