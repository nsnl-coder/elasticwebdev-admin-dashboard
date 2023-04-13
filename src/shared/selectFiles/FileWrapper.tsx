import useConfirm from '@src/hooks/useConfirm';
import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import useDeleteFile from '@src/react-query/files/useDeleteFile';
import imageOrVideo from '@src/utils/imageOrVideo';
import { Dispatch, SetStateAction, use, useEffect, useState } from 'react';
import { TbTrashFilled } from 'react-icons/tb';

interface Props {
  children: JSX.Element | JSX.Element[];
  s3Key: string;
  index: number;
  setFiles: Dispatch<SetStateAction<string[]>>;
}

function FileWrapper(props: Props): JSX.Element {
  const { s3Key, index, setFiles } = props;
  //
  const { isConfirmed } = useConfirm();
  const { deleteFile, isDeleted, isDeleting } = useDeleteFile();

  const handleDeleteS3File = async () => {
    setFiles((prev) => prev.filter((key) => key !== s3Key));
  };

  const handlePinImage = () => {
    setFiles((prev) => [s3Key, ...prev.filter((key) => key !== s3Key)]);
  };

  const fileIsImage = imageOrVideo(s3Key) === 'image';

  return (
    <div
      className={`relative border group rounded-md shadow-sm flex items-center justify-center aspect-square overflow-hidden ${
        index === 0 ? 'col-span-2 row-span-2' : ''
      } ${isDeleting ? 'opacity-50' : ''}`}
    >
      {props.children}
      <div
        className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer peer`}
      ></div>
      <div className="group-hover:opacity-100 opacity-0 absolute left-0 top-0 w-12 flex justify-between p-3">
        <div
          data-tip="delete image"
          className=" tooltip-right"
          onClick={handleDeleteS3File}
        >
          <TbTrashFilled
            size={24}
            className="text-white  tooltip-bottom hover:text-red-400 cursor-pointer"
          />
        </div>
      </div>
      {index !== 0 && (
        <button
          onClick={handlePinImage}
          className={` rounded-full whitespace-nowrap group-hover:opacity-100 opacity-0 absolute bg-primary text-white ${
            fileIsImage
              ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1'
              : 'bottom-3 left-3 px-3 text-sm py-0.5'
          }`}
        >
          Pin to top
        </button>
      )}
    </div>
  );
}

export default FileWrapper;
