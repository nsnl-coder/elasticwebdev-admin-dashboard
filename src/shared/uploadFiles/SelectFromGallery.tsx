import { GrGallery } from 'react-icons/gr';

interface Props {
  className?: string;
}

const SelectFromGallery = (props: Props) => {
  const { className } = props;
  return (
    <div
      className={`${className} rounded-lg text-center flex gap-y-3 hover:bg-gray-100 cursor-pointer flex-col items-center justify-center border border-dashed`}
    >
      <GrGallery size={30} />
      <span className="text-sm text-gray-600">Select from gallery</span>
    </div>
  );
};

export default SelectFromGallery;
