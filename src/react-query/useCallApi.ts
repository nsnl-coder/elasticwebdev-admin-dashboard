import { useState } from 'react';
import axios from '@src/config/axios';

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: object;
  params?: object;
}

type ApplyApiData = (payload: object) => any;

const useCallApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      console.log(err);
      setIsLoading(false);
      setError(err.response.data);
    }
  };

  return { isLoading, error, sendRequest, setError };
};

export default useCallApi;
