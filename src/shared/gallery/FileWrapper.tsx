import useConfirm from '@src/hooks/useConfirm';
import usePreviewOriginalFile from '@src/hooks/usePreviewOriginalFile';
import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import useDeleteFile from '@src/react-query/files/useDeleteFile';
import imageOrVideo from '@src/utils/imageOrVideo';
import { toastError } from '@src/utils/toast';
import { useIsMutating } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { TbTrashFilled } from 'react-icons/tb';

interface Props {
  children: JSX.Element | JSX.Element[];
  s3Key: string;
}

function FileWrapper(props: Props): JSX.Element {
  const { s3Key } = props;
  //
  const { isConfirmed } = useConfirm();
  const { deleteFile, isDeleting } = useDeleteFile();
  const {
    handleSelectFile,
    handleRemoveSelect,
    selectedFiles,
    maxFilesCount,
    allowedTypes,
    resolve,
  } = useSelectFromGallery();
  const { openPreviewModal } = usePreviewOriginalFile();

  //
  let isSelected = selectedFiles.includes(s3Key);
  const isDeletingFiles = useIsMutating(['delete-file']) && isSelected;
  const fileType = imageOrVideo(s3Key);
  const canSelect =
    (allowedTypes === fileType || allowedTypes === '*') &&
    selectedFiles.length < maxFilesCount;

  const handleAddImage = () => {
    if (!canSelect) {
      if (isSelected) handleRemoveSelect(s3Key);
      else toastError('You haved reach the maximum files selections!');
      return;
    }

    if (!isSelected) {
      handleSelectFile(s3Key);
    }
  };

  const handleRemoveS3File = async () => {
    const confirm = await isConfirmed('Do you want to delete the file?');
    if (confirm) deleteFile({ key: s3Key });
  };

  useEffect(() => {
    if (maxFilesCount === 1 && isSelected) {
      resolve(selectedFiles);
    }
  }, [maxFilesCount, isSelected]);

  return (
    <div
      className={`group relative h-48 flex flex-col justify-center bg-gray-200 ${
        isDeleting || isDeletingFiles ? 'opacity-60' : ''
      }`}
    >
      {props.children}
      <div
        onClick={handleAddImage}
        className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 tooltip tooltip-bottom ${
          isSelected ? 'opacity-100 flex justify-end items-start' : 'opacity-0'
        } ${!canSelect ? 'cursor-not-allowed opacity-90' : ''}`}
        data-tip={canSelect ? 'Click to select' : 'Can not select more files!'}
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
            className="tooltip tooltip-right"
            onClick={handleRemoveS3File}
          >
            <TbTrashFilled
              size={24}
              className="text-white  tooltip-bottom hover:text-red-400 cursor-pointer"
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
  );
}

export default FileWrapper;
