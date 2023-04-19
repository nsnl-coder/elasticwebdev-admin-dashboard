import axios from '@src/config/axios';
import { HttpError, HttpSuccess } from '@src/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';
import { toastError, toastSuccess } from '@src/utils/toast';
import { useRouter } from 'next/router';
import { RequestConfig } from '../queryConfig';
import useConfirm from '@src/hooks/useConfirm';

const useDeleteOne = (requestConfig: RequestConfig) => {
  const router = useRouter();
  const { isConfirmed } = useConfirm();
  const queryClient = useQueryClient();

  const mutationFn = async (id: string) => {
    const { data } = await axios<HttpSuccess>({
      url: `${requestConfig.url}/${id}`,
      method: 'delete',
    });

    return data;
  };

  const onSuccess = () => {
    toastSuccess(`${requestConfig.singularName} has been deleted!`);
    if (router.query.id) router.push(`/${requestConfig.pluralName}`);
    if (!router.query.id) {
      queryClient.invalidateQueries([requestConfig.pluralName]);
    }
  };

  const onError = () => {
    toastError(`Can not delete ${requestConfig.singularName}`);
  };

  const mutation = useMutation<HttpSuccess, HttpError, string>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
  });

  const deleteOne = async (id: string | string[] | undefined) => {
    if (!id) return;
    if (typeof id !== 'string') return;

    const confirm = await isConfirmed(
      `Do you want to delete ${requestConfig.singularName}?`,
    );
    if (confirm) mutation.mutate(id);
  };

  return {
    isLoading: mutation.isLoading,
    deleteOne,
  };
};

export default useDeleteOne;
