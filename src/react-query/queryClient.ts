import { HttpError } from '@src/types/api';
import { toastGeneralError } from '@src/utils/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type OnErrorFn = (error: HttpError) => void;

const withDefaultOnError = (onError: OnErrorFn) => {
  return (error: HttpError) => {
    defaultOnError(error);
    onError(error);
  };
};

const defaultOnError = (err: unknown) => {
  const error = err as HttpError;

  if (!error.response) {
    toastGeneralError('Fail to connect to server!');
    return;
  }

  if (error.response.data.message === 'Something wentwrong') {
    toastGeneralError('Unexpected error happened!');
  }
};

// Call this function when you want to prefetch the data
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: defaultOnError,
    },
    mutations: {
      onError: defaultOnError,
    },
  },
});

export { QueryClientProvider, queryClient, withDefaultOnError };
