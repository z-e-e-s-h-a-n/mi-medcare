"use client";
import { ApiException } from "@lib/http/http-exception";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseExpiry } from "@lib/utils/general";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* -------------------------------------------
 * Helpers
 * ------------------------------------------- */

type ApiFn<T = any> = (...args: any[]) => Promise<ApiSuccess<T>>;
type ExtractData<T extends ApiFn> = Awaited<ReturnType<T>>["data"];

const STALE_TIME = parseExpiry("1h");

/* -------------------------------------------
 * CRUD Factory
 * ------------------------------------------- */
export const createCrudHooks = <
  TFindOne extends ApiFn,
  TFindAll extends ApiFn,
  TCreate extends ApiFn,
  TUpdate extends ApiFn,
  TRemove extends ApiFn,
  TRestore extends ApiFn,
>(
  api: {
    findOne: TFindOne;
    findAll: TFindAll;
    create: TCreate;
    update: TUpdate;
    remove: TRemove;
    restore: TRestore;
  },
  keys: { single: string; list: string },
) => {
  type SingleData = ExtractData<TFindOne>;
  type ListData = ExtractData<TFindAll>;
  type CreatePayload = Parameters<TCreate>[0];
  type UpdatePayload = Parameters<TUpdate>[1];
  type CUPayload = CreatePayload | UpdatePayload;

  /* =========================================================
   * SINGLE (create / update / find one)
   * ======================================================= */
  const useEntity = (id?: string) => {
    const { findOne } = api;

    const query = useQuery<SingleData, ApiException>({
      queryKey: [keys.single, id],
      queryFn: () => findOne(id!),
      enabled: !!id,
      select: (res) => res.data,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: STALE_TIME,
      gcTime: STALE_TIME,
    });

    const cu = useCUEntity(id);

    return {
      data: query.data,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      fetchError: query.error,
      mutateAsync: cu.mutateAsync,
      isPending: cu.isPending,
      mutateError: cu.error,
    };
  };

  /* =========================================================
   * LIST
   * ======================================================= */
  const useEntities = (...args: Parameters<TFindAll>) => {
    const { findAll } = api;

    const query = useQuery<ListData, ApiException>({
      queryKey: [keys.list, ...args],
      queryFn: () => findAll(...args),
      select: (res) => res.data as ListData,
      placeholderData: (prev) => prev,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: STALE_TIME,
      gcTime: STALE_TIME,
    });

    return {
      data: query.data,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      fetchError: query.error,
    };
  };

  /* =========================================================
   * CREATE
   * ======================================================= */
  const useCreateEntity = () => {
    const queryClient = useQueryClient();
    const { create } = api;

    const mutation = useMutation<SingleData, ApiException, CreatePayload>({
      mutationFn: create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [keys.list] });
      },
    });

    return {
      createAsync: mutation.mutateAsync,
      isCreating: mutation.isPending,
      createError: mutation.error,
    };
  };

  /* =========================================================
   * UPDATE
   * ======================================================= */

  const useUpdateEntity = (id: string) => {
    const queryClient = useQueryClient();
    const { update } = api;

    const mutation = useMutation<SingleData, ApiException, UpdatePayload>({
      mutationFn: (data) => update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [keys.single] });
        queryClient.invalidateQueries({ queryKey: [keys.list] });
      },
    });

    return {
      updateAsync: mutation.mutateAsync,
      isUpdating: mutation.isPending,
      updateError: mutation.error,
    };
  };

  /* =========================================================
   * CREATE OR UPDATE (CU)
   * ======================================================= */
  const useCUEntity = (id?: string) => {
    const queryClient = useQueryClient();
    const { create, update } = api;

    const mutation = useMutation<SingleData, ApiException, CUPayload>({
      mutationFn: (data) => {
        if (id) {
          return update(id, data as UpdatePayload);
        }
        return create(data as CreatePayload);
      },
      onSuccess: () => {
        if (id) {
          queryClient.invalidateQueries({ queryKey: [keys.single] });
        }
        queryClient.invalidateQueries({ queryKey: [keys.list] });
      },
    });

    return {
      mutateAsync: mutation.mutateAsync,
      isPending: mutation.isPending,
      error: mutation.error,
      mode: id ? "update" : "create",
    };
  };

  /* =========================================================
   * REMOVE
   * ======================================================= */
  const useRemoveEntity = () => {
    const queryClient = useQueryClient();
    const { remove } = api;

    const mutation = useMutation<
      null,
      ApiException,
      { id: string; force?: boolean }
    >({
      mutationFn: async ({ id, force }) => {
        const res = await remove(id, force);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [keys.list] });
      },
    });

    return {
      removeAsync: mutation.mutateAsync,
      isRemoving: mutation.isPending,
      removeError: mutation.error,
    };
  };

  /* =========================================================
   * RESTORE
   * ======================================================= */
  const useRestoreEntity = () => {
    const queryClient = useQueryClient();
    const { restore } = api;

    const mutation = useMutation({
      mutationFn: (id: string) => restore(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [keys.list] }),
    });

    return {
      restoreAsync: mutation.mutateAsync,
      isRestoring: mutation.isPending,
      restoreError: mutation.error,
    };
  };

  return {
    useEntity,
    useEntities,
    useCreateEntity,
    useUpdateEntity,
    useRemoveEntity,
    useRestoreEntity,
  };
};
