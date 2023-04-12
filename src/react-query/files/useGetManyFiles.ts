import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
//
import { HttpError, HttpResponse } from '@src/types/api';
import axios from '@src/config/axios';

type Response = {
  isTruncated: boolean;
  results: number;
  lastKey: number;
  data: { Key: string }[];
};

interface Query {
  startAfter?: string; // key of last file
  limit?: number; // # of files return
  prefix?: string; // in what folder
}

const useGetManyFiles = () => {
  const fetchPage = async ({ pageParam = undefined }) => {
    const { data } = await axios<Response>({
      method: 'get',
      url: '/api/files',
      params: {
        limit: 10,
        startAfter: pageParam,
      },
    });
    return data;
  };

  const res = useInfiniteQuery<any, HttpError, Response>(['files'], {
    queryFn: fetchPage,
    getNextPageParam: (lastPage: Response) =>
      lastPage.isTruncated ? lastPage.lastKey : undefined,
  });

  console.log(res.data);

  return {
    s3files: res.data,
    isLoading: res.isLoading,
    isError: res.isError,
    error: res.error,
  };
};

export default useGetManyFiles;
