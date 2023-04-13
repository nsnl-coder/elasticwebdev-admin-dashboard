import useDeleteFile from '@src/react-query/files/useDeleteFile';
import { useEffect, useState } from 'react';
import { TbTrashFilled } from 'react-icons/tb';

interface Props {
  children: JSX.Element | JSX.Element[];
  s3Key: string;
}

function FileWrapper(props: Props): JSX.Element {
  const { s3Key } = props;

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { deleteFile } = useDeleteFile();

  const handleAddImage = () => {
    setIsSelected((prev) => !prev);
  };

  const handleRemoveImage = () => {
    deleteFile({ key: s3Key });
  };

  return (
    <div className="group relative">
      {props.children}
      <div
        onClick={handleAddImage}
        className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer peer ${
          isSelected ? 'opacity-100 flex justify-end items-start' : 'opacity-0'
        }`}
      >
        {isSelected && (
          <input
            type="checkbox"
            className="checkbox m-4 pointer-events-none"
            checked={true}
            readOnly
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
      <div className="group-hover:opacity-100 opacity-0 absolute left-0 top-0 w-12 flex justify-between p-3">
        {!isSelected && (
          <div
            data-tip="delete image"
            className=" tooltip-right"
            onClick={handleRemoveImage}
          >
            <TbTrashFilled
              size={24}
              className="text-white  tooltip-bottom hover:text-red-400 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FileWrapper;
