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
  const { s3Files, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetFiles(isOpen);
  const { localFiles, setLocalFiles, selectLocalFiles } = useSelectLocalFiles();
  const { isUploaded, isUploading, resetUploadFile } = useUploadFiles(
    localFiles,
    setLocalFiles,
  );
  const { lastElementRef } = useInfiniteFetch({ hasNextPage, fetchNextPage });

  useEffect(() => {
    if (!isUploaded) return;
    if (!isOpen || !isFetching) resetUploadFile();
  }, [isOpen, isFetching, isUploaded, resetUploadFile]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <HiddenInput id="gallery_upload" selectFiles={selectLocalFiles} />
      <GalleryHeader isUploading={isUploading} isUploaded={isUploaded} />
      <div className="p-8 flex-grow   content-start items-center overflow-y-auto small-scrollbar">
        {s3Files?.pages.length && (
          <GalleryContent
            isFetching={isFetching}
            isLoading={isLoading}
            isUploaded={isUploaded}
            isUploading={isUploading}
            s3Files={s3Files}
          />
        )}
        {!isFetching && <div ref={lastElementRef}></div>}
      </div>
    </div>
  );
}

export default Gallery;
