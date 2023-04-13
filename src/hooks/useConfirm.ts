import { ConfirmContext } from '@src/contexts/ConfirmContextProvider';
import { useContext, useEffect, useState } from 'react';

const useConfirm = () => {
  const confirmContext = useContext(ConfirmContext);

  if (!confirmContext) {
    return {
      isConfirmed: () => undefined,
    };
  }
  const [confirm, setConfirm] = confirmContext;

  const isConfirmed = (prompt: string) => {
    const promise = new Promise((resolve, reject) => {
      setConfirm({ prompt, isOpen: true, resolve, reject });
    });

    const reset = () => {
      setConfirm({ prompt: '', resolve: null, reject: null, isOpen: false });
    };

    return promise.then(
      () => {
        reset();
        return true;
      },
      () => {
        reset();
        return false;
      },
    );
  };

  return {
    isConfirmed,
    resolve:confirm.resolve,
    reject:confirm.reject,
    isOpen:confirm.isOpen,
    prompt:confirm.prompt
  };
};

export default useConfirm;