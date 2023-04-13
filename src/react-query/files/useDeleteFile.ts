import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/api';
import { toastError } from '@src/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';

interface RequestData {
  key: string;
}

type Response = HttpResponse<any>;

const useDeleteFile = () => {
  const mutationFn = async ({ key }: RequestData) => {
    const { data } = await axios<Response>({
      url: '/api/files/delete-one-file',
      method: 'delete',
      params: {
        key,
      },
    });

    return data;
  };

  const onError = () => {
    toastError('Cannot delete file!');
  };

  const mutation = useMutation<Response, HttpError, RequestData>({
    mutationFn,
    onError: withDefaultOnError(onError),
  });

  return {
    isLoading: mutation.isLoading,
    deleteFile: mutation.mutate,
  };
};

export default useDeleteFile;
