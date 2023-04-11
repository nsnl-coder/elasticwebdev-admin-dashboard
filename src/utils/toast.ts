import { toast } from 'react-toastify';

const toastGeneralError = (message?: string) => {
  toast.error(message || 'Something went wrong! Try again later', {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

const toastSuccess = (content: string) => {
  toast(content, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export { toastGeneralError, toastSuccess };
