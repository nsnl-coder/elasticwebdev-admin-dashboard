import useSelectFiles from '@src/hooks/useSelectFiles';
import useUploadFiles from '@src/hooks/useUploadFiles';
import useGetManyFiles from '@src/react-query/files/useGetManyFiles';
import React from 'react';
import FilePreview from '../filePreview/FilePreview';
//
import HiddenInput from '../selectFiles/HiddenInput';
import FileWrapper from './FileWrapper';
import GalleryHeader from './GalleryHeader';
import GalleryLabel from './UploadLabel';

function Gallery(): JSX.Element {
  const { files, selectFiles, setFiles } = useSelectFiles();
  useUploadFiles(files, setFiles);
  const { s3files } = useGetManyFiles();

  return (
    <div>
      <label htmlFor="gallery" className="btn">
        open modal
      </label>
      <input type="checkbox" id="gallery" className="modal-toggle" />
      <label htmlFor="gallery" className="modal cursor-pointer">
        <HiddenInput id="gallery_upload" selectFiles={selectFiles} />
        <label className="modal-box max-w-6xl relative w-screen h-screen rounded-md p-0">
          <GalleryHeader />
          <div className="p-8 overflow-y-auto small-scrollbar grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 content-start gap-4 items-center">
            <GalleryLabel htmlFor="gallery_upload" />
            {s3files?.pages.map((page, index) => {
              return (
                <React.Fragment key={index}>
                  {...page.data.map((item) => (
                    <FileWrapper key={item.Key} s3Key={item.Key}>
                      <FilePreview
                        src={item.Key}
                        type="unknown"
                        className="h-48 w-full object-cover"
                      />
                    </FileWrapper>
                  ))}
                </React.Fragment>
              );
            })}
          </div>
        </label>
      </label>
    </div>
  );
}

export default Gallery;
