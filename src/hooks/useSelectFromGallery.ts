import { GalleryContext } from '@src/contexts/GalleryContextProvider';
import { useContext } from 'react';

const useSelectFromGallery = () => {
  const galleryContext = useContext(GalleryContext);

  const { state, setState, handleSelectFile, handleRemoveSelect } =
    galleryContext;

  const selectFromGallery = () => {
    const promise: Promise<string[]> = new Promise((resolve, reject) => {
      setState({
        isOpen: true,
        selectedFiles: [],
        resolve,
        reject,
      });
    });

    const cleanup = () => {
      setState({
        isOpen: false,
        resolve: null,
        reject: null,
        selectedFiles: [],
      });
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
  };
};

export default useSelectFromGallery;
