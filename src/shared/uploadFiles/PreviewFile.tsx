import { FileInfo } from '@src/hooks/useSelectFiles';
import { TbTrashFilled } from 'react-icons/tb';
import VideoPlayer from '../videoPlay/VideoPlayer';

interface Props {
  fileinfo: FileInfo;
  index: number;
  removeFile: (url: string) => void;
  pinFile: (file: FileInfo) => void;
}

function PreviewFile(props: Props): JSX.Element {
  const { fileinfo, index, removeFile, pinFile } = props;

  const handleRemoveImage = () => removeFile(fileinfo.url);
  const handlePinImage = () => pinFile(fileinfo);

  const fileIsImage = fileinfo.type.startsWith('image');
  const fileIsVideo = fileinfo.type.startsWith('video');

  return (
    <div
      className={`relative border group rounded-md shadow-sm flex items-center justify-center aspect-square overflow-hidden ${
        index === 0 ? 'col-span-2 row-span-2' : ''
      }`}
    >
      {fileIsImage && (
        <img
          className="object-contain max-w-full max-h-full"
          src={fileinfo.url}
        />
      )}
      {fileIsVideo && <VideoPlayer src={fileinfo.url} />}
      {fileIsImage && (
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 peer pointer-events-none"></div>
      )}
      <div
        className={`group-hover:opacity-100 opacity-0 absolute tooltip  ${
          fileIsImage
            ? 'left-5 top-5 tooltip-right'
            : 'bottom-3 right-3 tooltip-left'
        }

        `}
        data-tip="remove image"
        onClick={handleRemoveImage}
      >
        <TbTrashFilled
          size={24}
          className={`tooltip-bottom hover:text-red-400 cursor-pointer text-gray-500`}
        />
      </div>
      {index !== 0 && (
        <button
          onClick={handlePinImage}
          className={` rounded-full group-hover:opacity-100 opacity-0 absolute bg-primary text-white ${
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

export default PreviewFile;
