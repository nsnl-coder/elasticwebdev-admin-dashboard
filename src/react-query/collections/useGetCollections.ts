import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
//
import Collection from '@src/types/collection';
import { HttpError, HttpResponse } from '@src/types/api';
import { useRouter } from 'next/router';

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

  const res = useQuery<any, HttpError, Response>(
    ['collections', query],
    queryFn,
  );

  return {
    collections: res.data?.data,
    pagination: res.data?.pagination,
    isLoading: res.isLoading,
    isError: res.isError,
    error: res.error,
  };
};

export default useGetCollections;
