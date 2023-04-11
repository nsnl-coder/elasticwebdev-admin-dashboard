import { HttpError } from '@src/types/api';
import { toastGeneralError } from '@src/utils/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const onError = (err: unknown) => {
  toastGeneralError('Exexpected error happen!');
};

// Call this function when you want to prefetch the data
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError,
    },
    mutations: {
      onError,
    },
  },
});

export { QueryClientProvider, queryClient };
