import { FileInfo } from '@src/hooks/useSelectFiles';
import { Dispatch, SetStateAction } from 'react';
import { TbTrashFilled } from 'react-icons/tb';

interface Props {
  fileinfo: FileInfo;
  index: number;
  removeFile: (url: string) => void;
  pinFile: (file: FileInfo) => void;
}

function PreviewImage(props: Props): JSX.Element {
  const { fileinfo, index, removeFile, pinFile } = props;

  const handleRemoveImage = () => removeFile(fileinfo.url);
  const handlePinImage = () => pinFile(fileinfo);

  return (
    <div
      className={`relative border group rounded-md shadow-sm flex items-center justify-center aspect-square overflow-hidden ${
        index === 0 ? 'col-span-2 row-span-2' : ''
      }`}
    >
      <img
        className="object-contain max-w-full max-h-full"
        src={fileinfo.url}
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 peer"></div>
      <div
        className="group-hover:opacity-100 opacity-0 absolute left-5 top-5 tooltip tooltip-right"
        data-tip="remove image"
        onClick={handleRemoveImage}
      >
        <TbTrashFilled
          size={24}
          className="text-white  tooltip-bottom hover:text-red-400 cursor-pointer"
        />
      </div>
      <button
        onClick={handlePinImage}
        className="px-4 py-1 rounded-full group-hover:opacity-100 opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white"
      >
        Pin to top
      </button>
    </div>
  );
}

export default PreviewImage;
