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
  const wrongType = allowedTypes !== fileType && allowedTypes !== '*';
  const canToggle = !wrongType && selectedFiles.length < maxFilesCount;

  const handleAddImage = () => {
    if (wrongType) {
      toastError('File type is not allowed!');
      return;
    }

    if (!canToggle && !isSelected) {
      toastError('You haved reach the maximum files selections!');
    }

    if (isSelected) handleRemoveSelect(s3Key);

    if (canToggle && !isSelected) {
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
      className={`group relative h-32 flex flex-col justify-center bg-gray-200 shadow-sm rounded-xl overflow-hidden ${
        isDeleting || isDeletingFiles ? 'opacity-60' : ''
      }`}
    >
      {props.children}
      {!isSelected && canToggle && (
        <div className="group-hover:opacity-100 z-20 opacity-0 absolute left-0 top-0 w-full flex justify-between p-3 items-center peer">
          <div onClick={() => openPreviewModal(s3Key)}>
            <AiFillEye size={30} className="text-white hover:text-gray-200" />
          </div>
          <div onClick={handleRemoveS3File}>
            <TbTrashFilled
              size={26}
              className="text-white hover:text-red-400 cursor-pointer"
            />
          </div>
        </div>
      )}
      <div
        onClick={handleAddImage}
        className={`absolute inset-0 z-10 opacity-0 peer-hover:opacity-100 peer-hover:bg-black/50 group-hover:opacity-100 ${
          isSelected
            ? 'opacity-100 flex justify-end items-start bg-black/50'
            : 'opacity-0'
        } ${
          !canToggle && !isSelected
            ? 'cursor-not-allowed opacity-90'
            : 'hover:bg-black/50'
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
    </div>
  );
}

export default FileWrapper;
