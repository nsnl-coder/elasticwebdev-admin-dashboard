import { Children } from '@src/types/shared';
import React, { createContext, useEffect, useState } from 'react';

type AllowedFilesTypes = 'video' | 'image' | '*';

interface State {
  isOpen: boolean;
  resolve: any;
  reject: any;
  selectedFiles: string[];
  maxFilesCount: number;
  allowedTypes: 'video' | 'image' | '*';
}

type TContext = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  handleSelectFile: (url: string) => void;
  handleRemoveSelect: (url: string | string[]) => void;
};

const defaultState = {
  isOpen: false,
  resolve: null,
  reject: null,
  selectedFiles: [],
  maxFilesCount: 50,
  allowedTypes: '*',
} as State;

const GalleryContext = createContext<TContext>({
  state: defaultState,
  setState: () => undefined,
  handleSelectFile: () => undefined,
  handleRemoveSelect: () => undefined,
});

const GalleryContextProvider = (props: Children) => {
  const { children } = props;
  const [state, setState] = useState<State>(defaultState);

  const handleSelectFile = (url: string) => {
    setState((prev) => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, url],
    }));
  };

  const handleRemoveSelect = (removeUrl: string | string[]) => {
    if (typeof removeUrl === 'string') {
      setState((prev) => ({
        ...prev,
        selectedFiles: prev.selectedFiles.filter((url) => url !== removeUrl),
      }));
    } else {
      setState((prev) => ({
        ...prev,
        selectedFiles: prev.selectedFiles.filter(
          (url) => !removeUrl.includes(url),
        ),
      }));
    }
  };

  return (
    <GalleryContext.Provider
      value={{ state, setState, handleSelectFile, handleRemoveSelect }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;
export { GalleryContext, defaultState };
export type { AllowedFilesTypes };
