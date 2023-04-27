import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { withDefaultOnError } from '../queryClient';
import { RequestConfig } from '../queryConfig';

//
import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError } from '@src/utils/toast';

interface OptionalQuery {
  includeUrlQuery: boolean;
  fields?: string;
  sort?: string;
  page?: number;
  itemsPerPage?: number;
  [key: string]: any;
  startAfter?: string;
  prefix?: string;
  key?: string;
}

const useGetOnes = <T>(
  requestConfig: RequestConfig,
  optionalQuery?: OptionalQuery,
) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();

  const queryFn = useCallback(async () => {
    const { data } = await axios<HttpResponse<T[]>>({
      method: 'get',
      url: requestConfig.url,
      params: optionalQuery || query,
    });
    return data;
  }, [optionalQuery, query, requestConfig.url]);

  const onError = () => {
    toastError(`Can not get ${requestConfig.pluralName}`);
  };

  const res = useQuery<any, HttpError, HttpResponse<T[]>>({
    queryKey: [requestConfig.pluralName, optionalQuery || query],
    queryFn,
    onError: withDefaultOnError(onError),
    keepPreviousData: true,
  });

  useEffect(() => {
    let currentPage = query.page;
    if (!currentPage) return;

    let totalPages = res.data?.pagination?.totalPages;
    if (!totalPages) return;

    if (Number(currentPage) > 0 && Number(currentPage) < totalPages) {
      const nextQuery = {
        ...query,
        page: (Number(currentPage) + 1).toString(),
      };

      queryClient.prefetchQuery({
        queryKey: [requestConfig.pluralName, nextQuery],
        queryFn,
      });
    }
  }, [
    query.page,
    query,
    queryClient,
    queryFn,
    requestConfig.pluralName,
    res.data?.pagination?.totalPages,
  ]);

  return {
    data: res.data?.data,
    pagination: res.data?.pagination,
    isLoading: res.isLoading,
    isError: res.isError,
    error: res.error,
  };
};

export default useGetOnes;
