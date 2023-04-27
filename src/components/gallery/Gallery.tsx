import useGetFiles from '@src/react-query/files/useGetFiles';
import React, { useEffect } from 'react';
//
import HiddenInput from '../selectFiles/HiddenInput';
import GalleryHeader from './GalleryHeader';
import useSelectLocalFiles from '@src/hooks/useSelectLocalFiles';
import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import GalleryContent from './GalleryContent';
import useUploadFiles from '@src/react-query/files/useUploadFiles';
import useInfiniteFetch from '@src/react-query/query/useInfiniteFetch';

function Gallery(): JSX.Element | null {
  const { isOpen } = useSelectFromGallery();
  const {
    s3Files,
    isLoading: isLoadingFiles,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetFiles(isOpen);
  const { localFiles, setLocalFiles, selectLocalFiles } = useSelectLocalFiles();
  const { isUploading, resetMutationState, s3Key } = useUploadFiles({
    localFiles,
    setLocalFiles,
    isMaxFilesCount: false,
  });

  useEffect(() => {
    if (s3Key) {
      resetMutationState();
    }
  }, [s3Key, resetMutationState]);

  const { lastElementRef } = useInfiniteFetch({ hasNextPage, fetchNextPage });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <HiddenInput id="gallery_upload" selectFiles={selectLocalFiles} />
      <GalleryHeader isUploading={isUploading} />
      <div className="p-8 flex-grow content-start items-center overflow-y-auto small-scrollbar">
        {s3Files?.pages.length && (
          <GalleryContent
            isLoadingFiles={isLoadingFiles}
            isUploading={isUploading}
            s3Files={s3Files}
            selectLocalFiles={selectLocalFiles}
            isFetching={isFetching}
          />
        )}
        {!isFetching && <div ref={lastElementRef}></div>}
      </div>
    </div>
  );
}

export default Gallery;
