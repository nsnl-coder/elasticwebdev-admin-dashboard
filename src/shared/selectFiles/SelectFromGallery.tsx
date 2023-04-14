import { AllowedFilesTypes } from '@src/contexts/GalleryContextProvider';
import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import { toastError } from '@src/utils/toast';
import { Dispatch, SetStateAction } from 'react';
import { GrGallery } from 'react-icons/gr';

interface Props {
  className?: string;
  setFiles: Dispatch<SetStateAction<string[]>>;
  maxFilesCount: number;
  currentFilesCount: number;
  allowedTypes: AllowedFilesTypes;
}

const SelectFromGallery = (props: Props) => {
  const {
    className,
    setFiles,
    maxFilesCount,
    currentFilesCount,
    allowedTypes,
  } = props;
  const { selectFromGallery } = useSelectFromGallery();

  const handleSelectFromGallery = async () => {
    const files = await selectFromGallery(
      maxFilesCount - currentFilesCount,
      allowedTypes,
    );
    if (files.length + currentFilesCount > maxFilesCount) {
      toastError(`Only allow maximum ${maxFilesCount} files!`);
    }
    setFiles((prev) => [...prev, ...files].slice(0, maxFilesCount));
  };
  return (
    <div
      className={`${className} rounded-lg h-full text-center flex gap-y-3 hover:bg-gray-100 cursor-pointer flex-col items-center justify-center border border-dashed`}
      onClick={handleSelectFromGallery}
    >
      <GrGallery size={30} />
      <span className="text-sm text-gray-600">Select from gallery</span>
    </div>
  );
};

export default SelectFromGallery;
