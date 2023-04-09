import { useAppDispatch } from '@src/hooks/redux';
import { logUserIn } from '@src/store/auth';
import User from '@src/types/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useCallApi, { Response } from '../useCallApi';

const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, apiError, sendRequest, setApiError } = useCallApi();

  const applyApiData = (res: Response) => {
    dispatch(logUserIn(res));
    router.push({
      pathname: '/',
    });
  };

  const login = (payload: Partial<User>) => {
    sendRequest(
      {
        url: '/auth/sign-in',
        data: payload,
        method: 'POST',
      },
      applyApiData,
    );
  };

  return { login, isLoading, apiError, setApiError };
};

export default useLogin;
