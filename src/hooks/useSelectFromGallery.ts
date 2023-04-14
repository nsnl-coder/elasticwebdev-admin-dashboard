import {
  AllowedFilesTypes,
  GalleryContext,
  defaultState,
} from '@src/contexts/GalleryContextProvider';

import { useContext } from 'react';

const useSelectFromGallery = () => {
  const galleryContext = useContext(GalleryContext);

  const { state, setState, handleSelectFile, handleRemoveSelect } =
    galleryContext;

  const selectFromGallery = (
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
  };

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
  };
};

export default useSelectFromGallery;
