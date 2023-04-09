import { useEffect, useState } from 'react';
import axios from '@src/config/axios';
import { toastGeneralError } from '@src/utils/toast';

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: object;
  params?: object;
}

interface ApiError {
  status: string;
  message: string;
  errors?: string[];
}

interface Response {
  status: string;
  message?: string;
  data?: string;
  errors?: string[];
}

type ApplyApiData = (payload: Response) => any;

const useCallApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const sendRequest = async (
    requestConfig: RequestConfig,
    applyApiData: ApplyApiData,
  ) => {
    setIsLoading(true);
    const token = localStorage.getItem('token') || undefined;

    try {
      const { data } = await axios({
        method: requestConfig.method || 'GET',
        url: requestConfig.url,
        data: requestConfig.data,
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: requestConfig.params,
        withCredentials: true,
      });
      applyApiData(data);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      if (err.response?.data) {
        setApiError(err.response?.data);
      } else {
        toastGeneralError();
        setApiError({
          status: 'fail',
          message: 'Server is not up! Please double check!',
        });
      }
    }
  };

  return { isLoading, apiError, sendRequest, setApiError };
};

export default useCallApi;
export type { Response };
