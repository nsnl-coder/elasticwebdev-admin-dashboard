import useSelectFiles from '@src/hooks/useSelectFiles';
import useUploadFiles from '@src/hooks/useUploadFiles';
import useGetManyFiles from '@src/react-query/files/useGetManyFiles';
import React from 'react';
import FilePreview from '../filePreview/FilePreview';
//
import HiddenInput from '../selectFiles/HiddenInput';
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
      <label htmlFor="gallery" className="modal px-6 cursor-pointer">
        <HiddenInput id="gallery_upload" selectFiles={selectFiles} />
        <label className="modal-box max-w-6xl relative w-screen h-screen">
          <div className="overflow-y-auto small-scrollbar rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 content-start gap-4 items-center">
            <GalleryLabel htmlFor="gallery_upload" />
            {s3files?.pages.map((page, index) => {
              return (
                <React.Fragment key={index}>
                  {...page.data.map((item) => (
                    <FilePreview
                      src={item.Key}
                      key={item.Key}
                      type=""
                      className="h-48 w-full object-cover"
                    />
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
