import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/api';
import { useMutation } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';
import { toastError, toastSuccess } from '@src/utils/toast';
import { RequestConfig } from '../queryConfig';

const useUpdateOne = <T extends { _id?: string } = any>(
  requestConfig: RequestConfig,
) => {
  const mutationFn = async (payload: T) => {
    const { data } = await axios<HttpResponse<T>>({
      url: `${requestConfig.url}/${payload._id}`,
      method: 'put',
      data: payload,
    });

    return data;
  };

  const onSuccess = (res: HttpResponse<T>) => {
    toastSuccess(`${requestConfig.singularName} has been updated!`);
  };

  const onError = () => {
    toastError(`Can not update ${requestConfig.singularName}!`);
  };

  const mutation = useMutation<HttpResponse<T>, HttpError, T>({
    mutationKey: [requestConfig.pluralName],
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const updateOne = (payload: T, id: string | string[] | undefined) => {
    if (!id) return;
    if (typeof id !== 'string') return;
    if (id === 'create') return;

    mutation.mutate({ ...payload, _id: id });
  };

  return {
    isLoading: mutation.isLoading,
    updateOne,
    isSuccess: mutation.isSuccess,
  };
};

export default useUpdateOne;
