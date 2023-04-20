import {
  AllowedFilesTypes,
  GalleryContext,
  defaultState,
} from '@src/contexts/GalleryContextProvider';

import { useCallback, useContext } from 'react';

const useSelectFromGallery = () => {
  const galleryContext = useContext(GalleryContext);

  const { state, setState, handleSelectFile, handleRemoveSelect } =
    galleryContext;

  const selectFromGallery = useCallback(
    (
      maxFilesCount: number,
      allowedTypes: AllowedFilesTypes = '*',
      excludedFiles: string[] = [],
    ) => {
      const promise: Promise<string[]> = new Promise((resolve, reject) => {
        setState({
          isOpen: true,
          selectedFiles: excludedFiles,
          resolve,
          reject,
          maxFilesCount,
          allowedTypes,
        });
      });

      const cleanup = () => {
        setState(defaultState);
      };

      return promise.then(
        (files) => {
          cleanup();
          return files;
        },
        () => {
          cleanup();
          return [];
        },
      );
    },
    [setState],
  );

  const haha = '1111';

  return {
    handleSelectFile,
    selectFromGallery,
    handleRemoveSelect,
    resolve: state.resolve,
    reject: state.reject,
    isOpen: state.isOpen,
    selectedFiles: state.selectedFiles,
    maxFilesCount: state.maxFilesCount,
    allowedTypes: state.allowedTypes,
    haha,
  };
};

export default useSelectFromGallery;
