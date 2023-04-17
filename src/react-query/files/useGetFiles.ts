import { useInfiniteQuery } from '@tanstack/react-query';
//
import { HttpError } from '@src/types/api';
import axios from '@src/config/axios';
import { toastError } from '@src/utils/toast';
import { withDefaultOnError } from '../queryClient';

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
        limit: 20,
        startAfter: pageParam,
      },
    });
    return data;
  };

  const onError = () => {
    toastError('Can not get files!');
  };

  const res = useInfiniteQuery<any, HttpError, Response>(['files'], {
    queryFn: fetchPage,
    getNextPageParam: (lastPage: Response) =>
      lastPage.isTruncated ? lastPage.lastKey : undefined,
    onError: withDefaultOnError(onError),
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
