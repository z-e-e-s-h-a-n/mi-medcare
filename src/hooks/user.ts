"use client";
import { signOut } from "@lib/auth/client";
import { getCurrentUser, updateProfile } from "@lib/user/client";
import { parseExpiry } from "@lib/utils/general";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SLATE_TIME = parseExpiry("15m");

const useUser = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    select: (res) => res.data,
    staleTime: SLATE_TIME,
    gcTime: SLATE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const signoutMutation = useMutation({
    mutationFn: () => signOut(),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UserProfileType) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });

  return {
    currentUser: userQuery.data,
    isFetching: userQuery.isLoading || userQuery.isFetching,
    fetchError: userQuery.error,
    logoutUser: signoutMutation.mutateAsync,
    isLogoutPending: signoutMutation.isPending,
    logoutError: signoutMutation.error,
    updateProfile: updateMutation.mutateAsync,
    isUpdatePending: updateMutation.isPending,
    updateError: updateMutation.error,
  };
};

export default useUser;
