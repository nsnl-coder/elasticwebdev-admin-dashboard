import { useAppDispatch } from '@src/hooks/redux';
import { failToLogin } from '@src/store/auth';
import { toastError } from '@src/utils/toast';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useCallApi from '../useCallApi';

const useLogout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, apiError, sendRequest, setApiError } = useCallApi();

  const applyApiData = () => {
    dispatch(failToLogin());
    router.push({
      pathname: '/auth/login',
    });
  };

  const logout = () => {
    sendRequest(
      {
        url: '/api/auth/sign-out',
        method: 'POST',
      },
      applyApiData,
    );
  };

  useEffect(() => {
    if (apiError) {
      toastError();
    }
  }, [apiError]);

  return { logout, isLoading, apiError, setApiError };
};

export default useLogout;
