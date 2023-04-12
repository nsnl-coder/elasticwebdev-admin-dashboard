import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/api';
import { toastError } from '@src/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';

interface RequestData {
  type: string;
  size: number;
}

type presignedUrl = string;

type Response = HttpResponse<presignedUrl>;

const useCreatePresignedUrl = () => {
  const mutationFn = async (payload: RequestData) => {
    const { data } = await axios<Response>({
      method: 'post',
      url: '/api/files/presigned-url',
      data: payload,
    });
    console.log('creating presign url');

    return data;
  };

  const onError = () => {
    toastError('Cannot create presigned url!');
  };

  const mutation = useMutation<Response, HttpError, RequestData>({
    mutationFn,
    onError: withDefaultOnError(onError),
    retry: 0,
  });

  return {
    createPresignUrl: mutation.mutate,
    url: mutation.data?.data,
    status: mutation.status,
  };
};

export default useCreatePresignedUrl;
