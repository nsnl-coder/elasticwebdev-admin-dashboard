import { Dispatch, SetStateAction, useState } from 'react';
import { TbTrashFilled } from 'react-icons/tb';
import { AiFillEye, AiFillPushpin } from 'react-icons/ai';
import usePreviewOriginalFile from '@src/hooks/usePreviewOriginalFile';
import { useDrag } from 'react-dnd';
import { DRAG_TYPES } from '@src/types/enum';
import { CollectedProps } from '@src/types/shared';

interface Props {
  children: JSX.Element | JSX.Element[];
  s3Key: string;
  index: number;
  setFiles: Dispatch<SetStateAction<string[]>>;
}

function FileWrapper(props: Props): JSX.Element {
  const { s3Key, index, setFiles } = props;

  const { openPreviewModal } = usePreviewOriginalFile();

  const handlePinImage = () => {
    setFiles((prev) => [s3Key, ...prev.filter((key) => key !== s3Key)]);
  };

  const handleRemoveFile = async () => {
    setFiles((prev) => prev.filter((key) => key !== s3Key));
  };

  return (
    <>
      <div
        className={`relative border group rounded-md shadow-sm flex items-center justify-center aspect-square overflow-hidden bg-gray-50 ${
          index === 0 ? 'col-span-2 row-span-2' : ''
        }`}
        draggable={true}
      >
        {props.children}
        <div
          className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer peer`}
        ></div>
        <div className="group-hover:opacity-100 opacity-0 absolute left-0 top-0 w-full flex justify-between p-3 ">
          <div
            onClick={handleRemoveFile}
            className="tooltip tooltip-right"
            data-tip="remove image"
          >
            <TbTrashFilled
              size={24}
              className="text-gray-400  tooltip-bottom hover:text-red-400 cursor-pointer"
            />
          </div>
          {index !== 0 && (
            <div
              className="tooltip tooltip-left cursor-pointer"
              data-tip="pin image"
              onClick={handlePinImage}
            >
              <AiFillPushpin
                size={26}
                className="text-gray-400 hover:text-gray-200"
              />
            </div>
          )}
        </div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tooltip tooltip-bottom cursor-pointer opacity-0 group-hover:opacity-100"
          data-tip="view original"
          onClick={() => openPreviewModal(s3Key)}
        >
          <AiFillEye size={42} className="text-gray-400 hover:text-gray-200" />
        </div>
      </div>
    </>
  );
}

export default FileWrapper;
