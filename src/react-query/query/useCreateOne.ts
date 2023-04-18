import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/api';
import { useMutation } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';
import { toastSuccess } from '@src/utils/toast';
import { useRouter } from 'next/router';
import { RequestConfig } from '../queryConfig';

const useCreateOne = <T extends { _id?: string }>(
  requestConfig: RequestConfig,
) => {
  const router = useRouter();

  const mutationFn = async (payload: T) => {
    const { data } = await axios<HttpResponse<T>>({
      url: requestConfig.url,
      method: 'post',
      data: payload,
    });

    return data;
  };

  const onSuccess = (res: HttpResponse<T>) => {
    toastSuccess(`${requestConfig.singularName} has been created!`);

    if (res.data?._id) {
      router.push(`/${requestConfig.pluralName}/${res.data._id}`);
    }
  };

  const onError = () => {};

  const mutation = useMutation<HttpResponse<T>, HttpError, T>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const createOne = (payload: T, id: string | string[] | undefined) => {
    if (id === 'create') mutation.mutate(payload);
  };

  return {
    isLoading: mutation.isLoading,
    createOne,
  };
};

export default useCreateOne;
