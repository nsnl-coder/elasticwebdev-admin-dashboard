import axios from '@src/config/axios';
import { useQuery } from '@tanstack/react-query';
//
import { withDefaultOnError } from '../queryClient';
import { useRouter } from 'next/router';
import { FieldValues, UseFormReset } from 'react-hook-form';
import { RequestConfig } from '../queryConfig';
import { toastError } from '@src/utils/toast';
import { HttpError, HttpResponse } from '@src/types/http';

const useGetOne = <T extends FieldValues>(
  requestConfig: RequestConfig,
  reset: UseFormReset<T>,
) => {
  const id = useRouter().query.id;

  const queryFn = async () => {
    const { data } = await axios<HttpResponse<T>>({
      method: 'get',
      url: `${requestConfig.url}/${id}`,
    });
    return data;
  };

  const onError = (err: HttpError) => {
    toastError(`Can not get ${requestConfig.singularName}`);
  };

  const onSuccess = (res: HttpResponse<T>) => {
    reset(res.data);
  };

  const res = useQuery<any, HttpError, HttpResponse<T>>({
    queryKey: [requestConfig.pluralName, id],
    queryFn,
    enabled: !!id && id != 'create',
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  return {
    isLoading: res.isLoading,
    isError: res.isError,
    error: res.error,
    data: res.data?.data,
    isSuccess: res.isSuccess,
  };
};

export default useGetOne;
