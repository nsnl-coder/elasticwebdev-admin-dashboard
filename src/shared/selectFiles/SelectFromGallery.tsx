import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import { Dispatch, SetStateAction } from 'react';
import { GrGallery } from 'react-icons/gr';

interface Props {
  className?: string;
  setFiles: Dispatch<SetStateAction<string[]>>;
}

const SelectFromGallery = (props: Props) => {
  const { selectFromGallery } = useSelectFromGallery();
  const { className, setFiles } = props;

  const handleSelectFromGallery = async () => {
    const files = await selectFromGallery();
    setFiles((prev) => [...prev, ...files]);
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
