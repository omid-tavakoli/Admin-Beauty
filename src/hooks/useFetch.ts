import {
  UseQueryOptions,
  useQuery,
  useMutation,
  UndefinedInitialDataOptions,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

export const useGet = <T extends any[], R>(
  queryFn: (...arg: T) => R,
  queryKey: string[],
  option: Omit<UndefinedInitialDataOptions, "queryFn" | "queryKey">,
  ...queryFnParams: Parameters<typeof queryFn>
) => {
  return useQuery({
    queryFn: async (payload) => {
      //@ts-ignore
      return queryFn(...queryFnParams, payload);
    },
    queryKey,
    ...option,
  }) as UseQueryResult<Awaited<R>>;
};

export const useMutate = <T extends any, R extends any>(
  queryFn: (params: T) => Promise<R>,
  config?: UseQueryOptions<R>
): UseMutationResult<R, Error, T, unknown> => ({
  ...useMutation({ mutationFn: queryFn }),
});
