import axios from '@src/config/axios';
import { HttpError, HttpResponse, HttpSuccess } from '@src/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';
import { toastError, toastSuccess } from '@src/utils/toast';
import { useRouter } from 'next/router';
import { RequestConfig } from '../queryConfig';
import useConfirm from '@src/hooks/useConfirm';

interface Response extends HttpSuccess {
  deletedCount: number;
}

const useDeleteOnes = (requestConfig: RequestConfig) => {
  const router = useRouter();
  const { isConfirmed } = useConfirm();
  const queryClient = useQueryClient();

  const mutationFn = async (ids: string[]) => {
    const { data } = await axios<Response>({
      url: requestConfig.url,
      method: 'delete',
      data: {
        deleteList: ids,
      },
    });

    return data;
  };

  const onSuccess = (data: Response) => {
    toastSuccess(
      `${data.deletedCount} ${
        data.deletedCount > 1
          ? requestConfig.pluralName
          : requestConfig.singularName
      } has been deleted!`,
    );
    if (router.query.id) router.push(`/${requestConfig.pluralName}`);
    if (!router.query.id) {
      queryClient.invalidateQueries([requestConfig.pluralName]);
    }
  };

  const onError = () => {
    toastError(`Can not delete ${requestConfig.pluralName}`);
  };

  const mutation = useMutation<Response, HttpError, string[]>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const deleteOnes = async (ids: string[]) => {
    if (ids.length === 0) return;
    const confirm = await isConfirmed(
      `Do you want to delete ${ids.length} ${
        ids.length > 1 ? requestConfig.pluralName : requestConfig.singularName
      }?`,
    );

    if (confirm) {
      mutation.mutate(ids);
    }
  };

  return {
    isLoading: mutation.isLoading,
    deleteOnes,
    isDeleted: mutation.isSuccess,
  };
};

export default useDeleteOnes;
