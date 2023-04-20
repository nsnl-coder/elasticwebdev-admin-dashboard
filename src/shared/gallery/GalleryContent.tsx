import { Response } from '@src/react-query/files/useGetFiles';
import { InfiniteData } from '@tanstack/react-query';
import React from 'react';
import FileWrapper from './FileWrapper';
import FilePreview from '../filePreview/FilePreview';

interface Props {
  s3Files: InfiniteData<Response>;
}

function GalleryContent(props: Props): JSX.Element {
  const { s3Files } = props;

  return (
    <>
      {s3Files?.pages.map((page, index) => {
        return (
          <React.Fragment key={index}>
            {...page.data.map((item, i) => (
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
    </>
  );
}

export default GalleryContent;
