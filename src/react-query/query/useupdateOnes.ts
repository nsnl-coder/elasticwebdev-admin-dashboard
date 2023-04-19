import axios from '@src/config/axios';
import { HttpError, HttpSuccess } from '@src/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';
import { toastError, toastSuccess } from '@src/utils/toast';
import { RequestConfig } from '../queryConfig';

interface Response extends HttpSuccess {
  modifiedCount: number;
}

interface Payload {
  updateList: string[];
  [key: string]: any;
}

const useUpdateOnes = (requestConfig: RequestConfig) => {
  const queryClient = useQueryClient();
  const mutationFn = async (payload: Payload) => {
    const { data } = await axios<Response>({
      url: requestConfig.url,
      method: 'put',
      data: payload,
    });

    return data;
  };

  const onSuccess = (res: Response) => {
    toastSuccess(
      `${res.modifiedCount} ${
        res.modifiedCount > 1
          ? requestConfig.pluralName
          : requestConfig.singularName
      } has been updated!`,
    );
    queryClient.invalidateQueries([requestConfig.pluralName]);
  };

  const onError = () => {
    toastError(`Can not update ${requestConfig.pluralName}`);
  };

  const mutation = useMutation<Response, HttpError, Payload>({
    mutationKey: [requestConfig.pluralName],
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const updateOnes = (payload: any, ids: string[]) => {
    if (!ids.length) return;

    let updatePayload = {
      ...payload,
      updateList: ids,
    };

    mutation.mutate(updatePayload);
  };

  return {
    isLoading: mutation.isLoading,
    updateOnes,
  };
};

export default useUpdateOnes;
