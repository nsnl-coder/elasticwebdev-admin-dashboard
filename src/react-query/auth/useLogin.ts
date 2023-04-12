import { useMutation } from '@tanstack/react-query';
//
import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/api';
import User from '@src/types/user';
import { useAppDispatch } from '@src/hooks/redux';
import { failToLogin, logUserIn } from '@src/store/auth';
import { withDefaultOnError } from '../queryClient';

type Response = HttpResponse<User>;

interface LoginInfo {
  email: string;
  password: string;
}

const useLogin = () => {
  const dispatch = useAppDispatch();

  const mutationFn = async (payload: LoginInfo) => {
    const { data } = await axios<Response>({
      method: 'post',
      url: '/api/auth/sign-in',
      data: payload,
    });

    return data;
  };

  const onSuccess = (data: Response) => dispatch(logUserIn(data));
  const onError = (error: HttpError) => dispatch(failToLogin());

  const mutation = useMutation<Response, HttpError, LoginInfo>({
    mutationFn,
    onError: withDefaultOnError(onError),
    onSuccess,
    retry: 0,
  });

  console.log(mutation.error);

  return {
    login: mutation.mutate,
    isLoading: mutation.isLoading,
    apiError: mutation.error?.response?.data || null,
    reset: mutation.reset,
  };
};

export default useLogin;
