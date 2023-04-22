import axios from '@src/config/axios';
import { toastError } from '@src/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';
import { HttpError } from '@src/types/http';

interface RequestData {
  type: string;
  size: number;
}

type Response = {
  data: {
    url: string;
    key: string;
  };
};

const useCreatePresignedUrl = () => {
  const mutationFn = async (payload: RequestData) => {
    const { data } = await axios<Response>({
      method: 'post',
      url: '/api/files/presigned-url',
      data: payload,
    });

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
    presignUrl: mutation.data?.data?.url,
    key: mutation.data?.data?.key,
    status: mutation.status,
    isCreating: mutation.isLoading,
    resetCreatePresignedUrl: mutation.reset,
  };
};

export default useCreatePresignedUrl;
