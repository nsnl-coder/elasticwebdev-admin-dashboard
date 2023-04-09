import { useAppDispatch } from '@src/hooks/redux';
import { failToLogin, logUserIn } from '@src/store/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
//
import useCallApi, { Response } from '../useCallApi';

const useGetCurrentUser = () => {
  const dispatch = useAppDispatch();
  const { isLoading, apiError, sendRequest, setApiError } = useCallApi();

  const applyApiData = (res: Response) => {
    dispatch(logUserIn(res));
  };

  useEffect(() => {
    sendRequest(
      {
        url: '/auth/current-user',
        method: 'GET',
      },
      applyApiData,
    );
  }, []);

  useEffect(() => {
    if (apiError) {
      dispatch(failToLogin());
    }
  }, [apiError]);

  return { isLoading, apiError, setApiError };
};

export default useGetCurrentUser;
