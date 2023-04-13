import useUploadFiles from '@src/hooks/useUploadFiles';
import useGetFiles from '@src/react-query/files/useGetFiles';
import React, { useEffect } from 'react';
//
import HiddenInput from '../selectFiles/HiddenInput';
import GalleryHeader from './GalleryHeader';
import GalleryLabel from './UploadLabel';
import useSelectLocalFiles from '@src/hooks/useSelectLocalFiles';
import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import GalleryContent from './GalleryContent';
import GridSkeleton from '../skeleton/GridSkeleton';
import useInfiniteFetch from '@src/hooks/useInfiniteFetch';

function Gallery(): JSX.Element {
  const { isOpen, reject } = useSelectFromGallery();
  const { s3Files, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetFiles(isOpen);
  const { files, selectFiles, setFiles } = useSelectLocalFiles();
  const { isUploaded, isUploading, reset } = useUploadFiles(files, setFiles);
  const { lastElementRef } = useInfiniteFetch({ hasNextPage, fetchNextPage });

  useEffect(() => {
    reset();
  }, [isOpen]);

  useEffect(() => {
    if (!isFetching) {
      reset();
    }
  }, [isFetching]);

  return (
    <div
      className={`modal cursor-pointer ${isOpen ? 'modal-open' : ''}`}
      onClick={reject}
    >
      <div
        className="modal-box max-w-6xl relative w-screen h-screen rounded-md p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <HiddenInput id="gallery_upload" selectFiles={selectFiles} />
        <GalleryHeader isUploading={isUploading} isUploaded={isUploaded} />
        <div className="p-8 overflow-y-auto small-scrollbar grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 content-start gap-4 items-center">
          <GalleryLabel htmlFor="gallery_upload" />
          {(isUploading || (isFetching && isUploaded)) && (
            <GridSkeleton count={1} className="h-48" />
          )}
          {isLoading && <GridSkeleton count={11} className="h-48" />}
          {s3Files?.pages.length && <GalleryContent s3Files={s3Files} />}
          {!isFetching && <div ref={lastElementRef}></div>}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
