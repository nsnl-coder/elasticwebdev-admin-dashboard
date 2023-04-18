import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
//
import { HttpError, HttpResponse } from '@src/types/api';
import axios from '@src/config/axios';
import { withDefaultOnError } from '../queryClient';
import { RequestConfig } from '../queryConfig';

const useGetOnes = <T>(requestConfig: RequestConfig) => {
  const { query } = useRouter();

  const queryFn = async () => {
    const { data } = await axios<HttpResponse<T[]>>({
      method: 'get',
      url: requestConfig.url,
      params: query,
    });
    return data;
  };

  const res = useQuery<any, HttpError, HttpResponse<T[]>>({
    queryKey: [requestConfig.pluralName, query],
    queryFn,
    onError: withDefaultOnError(),
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
