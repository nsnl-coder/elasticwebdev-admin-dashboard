import {
  QueryFunctionContext,
  QueryKey,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/router';
//
import { HttpError, HttpResponse } from '@src/types/api';
import axios from '@src/config/axios';
import { withDefaultOnError } from '../queryClient';
import { RequestConfig } from '../queryConfig';

const useGetOnes = <T>(requestConfig: RequestConfig) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();

  const queryFn = async ({ queryKey }: QueryFunctionContext<QueryKey, any>) => {
    const { data } = await axios<HttpResponse<T[]>>({
      method: 'get',
      url: requestConfig.url,
      params: queryKey[1],
    });
    return data;
  };

  const onSuccess = (data: HttpResponse<T[]>) => {
    if (data.pagination?.totalPages && data.pagination?.currentPage) {
      const { totalPages, currentPage } = data.pagination;
      const hasMore = totalPages > currentPage && currentPage > 0;
      if (hasMore && currentPage > 0) {
        if (!query.page) return;
        const nextQuery = {
          ...query,
          page: (Number(query.page) + 1).toString(),
        };
        let prefetchedData: HttpResponse<T[]> | undefined =
          queryClient.getQueryData([requestConfig.pluralName, nextQuery]);
        if (prefetchedData) return;
        queryClient.prefetchQuery({
          queryKey: [requestConfig.pluralName, nextQuery],
          queryFn,
        });
      }
    }
  };

  const res = useQuery<any, HttpError, HttpResponse<T[]>>({
    queryKey: [requestConfig.pluralName, query],
    queryFn,
    onError: withDefaultOnError(),
    onSuccess,
    keepPreviousData: true,
    staleTime: 20000,
  });

  return {
    data: res.data?.data,
    pagination: res.data?.pagination,
    isLoading: res.isLoading,
    isError: res.isError,
    error: res.error,
  };
};

export default useGetOnes;
