import { Response } from '@src/react-query/files/useGetFiles';
import { InfiniteData } from '@tanstack/react-query';
import React from 'react';
import FileWrapper from './FileWrapper';
import FilePreview from '../filePreview/FilePreview';
import UploadLabel from './UploadLabel';
import GridSkeleton from '../skeleton/GridSkeleton';

interface Props {
  s3Files: InfiniteData<Response>;
  isUploading: boolean;
  isFetching: boolean;
  isUploaded: boolean;
  isLoading: boolean;
}

function GalleryContent(props: Props): JSX.Element {
  const { s3Files, isFetching, isUploading, isUploaded, isLoading } = props;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
      <UploadLabel htmlFor="gallery_upload" />
      {(isUploading || (isFetching && isUploaded)) && (
        <GridSkeleton count={1} className="h-full w-full" />
      )}
      {isLoading && (
        <GridSkeleton
          count={9}
          className="h-32 rounded-xl overflow-hidden shadow-lg"
        />
      )}
      {s3Files?.pages.map((page, index) => {
        return (
          <React.Fragment key={index}>
            {...(page.data?.keys || []).map((item, i) => (
              <FileWrapper key={item.Key} s3Key={item.Key}>
                <FilePreview
                  src={item.Key}
                  className="w-full object-cover cursor-pointer h-28"
                />
              </FileWrapper>
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default GalleryContent;
