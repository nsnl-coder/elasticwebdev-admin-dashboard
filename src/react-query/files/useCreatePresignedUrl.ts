import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/api';
import { useMutation } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';

interface RequestData {
  type: string;
  size: number;
}

type Response = HttpResponse<any>;

const useCreatePresignedUrl = () => {
  const mutationFn = async (payload: RequestData) => {
    const { data } = await axios<Response>({
      method: 'post',
      url: '/api/files/presigned-url',
      data: payload,
    });

    return data;
  };

  const onError = () => {};

  const mutation = useMutation<Response, HttpError, RequestData>({
    mutationFn,
    onError: withDefaultOnError(onError),
    retry: 0,
  });

  return {
    isSuccess: mutation.isSuccess,
    createPresignUrl: mutation.mutate,
  };
};

export default useCreatePresignedUrl;
