import useConfirm from '@src/hooks/useConfirm';
import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import useDeleteFiles from '@src/react-query/files/useDeleteFiles';
import { useIsMutating } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ClipLoader, MoonLoader } from 'react-spinners';

interface Props {
  isUploading: boolean;
  isUploaded: boolean;
}

function GalleryHeader(props: Props): JSX.Element {
  const { isUploading } = props;
  const { selectedFiles, resolve, handleRemoveSelect } = useSelectFromGallery();
  const { isConfirmed } = useConfirm();
  const { deleteFiles, isDeleted } = useDeleteFiles();

  const selectedFileCount = selectedFiles.length;
  const isDeleting = useIsMutating(['delete-file']);
  const disabled = isUploading || isDeleting || !selectedFileCount;

  const deleteFilesHandler = async () => {
    const isConfirm = await isConfirmed(
      `Do you want to delete ${selectedFiles.length} files?`,
    );
    if (isConfirm) {
      deleteFiles({ deleteList: selectedFiles });
    }
  };

  useEffect(() => {
    if (isDeleted) {
      handleRemoveSelect(selectedFiles);
    }
  }, [isDeleted]);

  return (
    <div className="flex justify-between shadow-md p-8 items-center sticky top-0 z-50 bg-white">
      <button
        type="button"
        className={` px-4 py-1 text-white font-semibold bg-red-400 rounded-md ${
          disabled ? 'pointer-events-none opacity-70' : ''
        }`}
        onClick={deleteFilesHandler}
      >
        Delete files ({selectedFileCount})
      </button>
      <button
        type="button"
        className={`bg-primary text-white px-4 py-1 rounded-md font-semibold ${
          disabled ? 'pointer-events-none opacity-70' : ''
        }`}
        onClick={() => resolve(selectedFiles)}
      >
        Select files ({selectedFileCount})
      </button>
    </div>
  );
}

export default GalleryHeader;
