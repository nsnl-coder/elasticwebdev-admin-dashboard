import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
//
import { HttpError } from '@src/types/api';
import axios from '@src/config/axios';
import { useEffect } from 'react';

export type Response = {
  isTruncated: boolean;
  results: number;
  lastKey: number;
  data: { Key: string }[];
};

const useGetFiles = (isOpen: boolean) => {
  const fetchPage = async ({ pageParam = undefined }) => {
    const { data } = await axios<Response>({
      method: 'get',
      url: '/api/files',
      params: {
        limit: 5,
        startAfter: pageParam,
      },
    });
    return data;
  };

  const res = useInfiniteQuery<any, HttpError, Response>(['files'], {
    queryFn: fetchPage,
    getNextPageParam: (lastPage: Response) =>
      lastPage.isTruncated ? lastPage.lastKey : undefined,
    enabled: isOpen,
  });

  return {
    s3Files: res.data,
    isLoading: res.isLoading,
    isError: res.isError,
    isFetching: res.isFetching,
    fetchNextPage: res.fetchNextPage,
    hasNextPage: res.hasNextPage,
  };
};

export default useGetFiles;
