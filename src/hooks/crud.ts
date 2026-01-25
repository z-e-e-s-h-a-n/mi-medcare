import { ApiException } from "@lib/http/api-client";
import { parseExpiry } from "@lib/utils/general";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* -------------------------------------------
 * Helpers
 * ------------------------------------------- */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    type CreateUpdatePayload = Parameters<TCreate>[0];

    /* =========================================================
     * SINGLE (create / update / find one)
     * ======================================================= */
    const useEntity = (id?: string) => {
        const query = useQuery<SingleData, ApiException>({
            queryKey: [keys.single, id],
            queryFn: () => api.findOne(id!),
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
            isLoading: query.isLoading || cu.isPending,
            isFetching: query.isFetching,
            error: query.error || cu.error,
            mutateAsync: cu.mutateAsync,
        };
    };


    /* =========================================================
     * LIST
     * ======================================================= */
    const useEntities = (...args: Parameters<TFindAll>) => {
        const query = useQuery<ListData, ApiException>({
            queryKey: [keys.list, ...args],
            queryFn: () => api.findAll(...args),
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
            error: query.error,
        };
    };

    /* =========================================================
     * CREATE / UPDATE
     * ======================================================= */
    const useCUEntity = (id?: string) => {
        const queryClient = useQueryClient();

        const mutation = useMutation<
            SingleData,
            ApiException,
            CreateUpdatePayload
        >({
            mutationFn: (data) =>
                id ? api.update(id, data) : api.create(data),

            onSuccess: (res) => {
                // update single cache directly
                if (id) {
                    queryClient.setQueryData(
                        [keys.single, id],
                        res.data
                    );
                }

                // refresh list
                queryClient.invalidateQueries({
                    queryKey: [keys.list],
                });
            },
        });

        return {
            mutateAsync: mutation.mutateAsync,
            isPending: mutation.isPending,
            error: mutation.error,
        };
    };

    /* =========================================================
     * REMOVE
     * ======================================================= */
    const useRemoveEntity = () => {
        const queryClient = useQueryClient();

        const mutation = useMutation({
            mutationFn: ({ id, force }: { id: string; force?: boolean }) =>
                api.remove(id, force),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [keys.list] });
            },
        });

        return {
            remove: mutation.mutateAsync,
            isRemoving: mutation.isPending,
        };
    };

    /* =========================================================
     * RESTORE
     * ======================================================= */
    const useRestoreEntity = () => {
        const queryClient = useQueryClient();

        const mutation = useMutation({
            mutationFn: (id: string) => api.restore(id),
            onSuccess: () => queryClient.invalidateQueries({ queryKey: [keys.list] }),
        });

        return {
            restore: mutation.mutateAsync,
            isRestoring: mutation.isPending,
        };
    };

    return {
        useEntity,
        useEntities,
        useCUEntity,
        useRemoveEntity,
        useRestoreEntity,
    };
};
