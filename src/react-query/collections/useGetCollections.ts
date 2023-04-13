import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
//
import Collection from '@src/types/collection';
import { HttpError, HttpResponse } from '@src/types/api';
import axios from '@src/config/axios';
import { withDefaultOnError } from '../queryClient';
import { toastError } from '@src/utils/toast';

type Response = HttpResponse<Collection[]>;

const useGetCollections = () => {
  const { query } = useRouter();

  const queryFn = async () => {
    const { data } = await axios<Response>({
      method: 'get',
      url: '/api/collections',
      params: query,
    });
    return data;
  };

  const onError = () => {
    toastError('Can not fetch collections!');
  };

  const res = useQuery<any, HttpError, Response>({
    queryKey: ['collections', query],
    queryFn,
    onError: withDefaultOnError(onError),
  });

  return {
    collections: res.data?.data,
    pagination: res.data?.pagination,
    isLoading: res.isLoading,
    isError: res.isError,
    error: res.error,
  };
};

export default useGetCollections;
