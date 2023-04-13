import useConfirm from '@src/hooks/useConfirm';
import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import useDeleteFiles from '@src/react-query/files/useDeleteFiles';
import { useIsMutating } from '@tanstack/react-query';
import { ClipLoader, MoonLoader } from 'react-spinners';

interface Props {
  isUploading: boolean;
  isUploaded: boolean;
}

function GalleryHeader(props: Props): JSX.Element {
  const { isUploaded, isUploading } = props;
  const { selectedFiles, resolve, reject, handleRemoveSelect } =
    useSelectFromGallery();
  const selectedFileCount = selectedFiles.length;
  const { isConfirmed } = useConfirm();
  const { deleteFiles } = useDeleteFiles();

  const isDeleting = useIsMutating(['delete-file']);
  const disabled = isUploading || isDeleting || !selectedFileCount;

  const deleteFilesHandler = async () => {
    const isConfirm = await isConfirmed(
      `Do you want to delete ${selectedFiles.length} files?`,
    );
    if (isConfirm) {
      deleteFiles({ deleteList: selectedFiles });
      handleRemoveSelect(selectedFiles);
    }
  };

  return (
    <div className="flex justify-between shadow-md p-8 items-center">
      <button
        type="button"
        className={` px-4 py-1 text-white font-semibold bg-red-400 rounded-md ${
          disabled ? 'pointer-events-none opacity-70' : ''
        }`}
        onClick={deleteFilesHandler}
      >
        Delete files ({selectedFileCount})
      </button>
      {!!isDeleting && (
        <div className="flex items-center gap-x-3">
          <ClipLoader color="#93aea9" loading size={16} />
          Deleting...
        </div>
      )}

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
