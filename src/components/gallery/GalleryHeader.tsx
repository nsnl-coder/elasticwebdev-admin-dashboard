import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import useDeleteOnes from '@src/react-query/query/useDeleteOnes';
import queryConfig from '@src/react-query/queryConfig';
import { useIsMutating } from '@tanstack/react-query';
import { useEffect } from 'react';

interface Props {
  isUploading: boolean;
  isUploaded: boolean;
}

function GalleryHeader(props: Props): JSX.Element {
  const { isUploading } = props;
  const { selectedFiles, resolve, handleRemoveSelect } = useSelectFromGallery();
  const { deleteOnes: deleteFiles, isDeleted } = useDeleteOnes(
    queryConfig.files,
  );

  const selectedFileCount = selectedFiles.length;
  const isDeleting = useIsMutating(['delete-file']);
  const disabled = isUploading || isDeleting || !selectedFileCount;

  useEffect(() => {
    if (isDeleted) {
      handleRemoveSelect(selectedFiles);
    }
  }, [isDeleted, handleRemoveSelect, selectedFiles]);

  return (
    <div className="flex justify-between shadow-md px-8 items-center sticky top-0 z-50 bg-white h-20 flex-shrink-0">
      <button
        type="button"
        className={` px-4 py-1 text-white font-semibold bg-red-400 rounded-md ${
          disabled ? 'pointer-events-none opacity-70' : ''
        }`}
        onClick={() => deleteFiles(selectedFiles)}
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
