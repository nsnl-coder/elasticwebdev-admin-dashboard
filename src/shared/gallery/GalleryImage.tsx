import { useState } from 'react';
import { TbTrashFilled } from 'react-icons/tb';

interface Props {
  src: string;
}

function GalleryImage(props: Props): JSX.Element {
  const { src } = props;
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleRemoveImage = () => {};
  const handleSelectImage = () => {};
  const handleAddImage = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <div className="group relative">
      <img
        className="object-cover w-full"
        src={
          'https://img.quizur.com/f/img5bf5e6d2090c55.70073545.jpg?lastEdited=1542842070'
        }
      />
      <div
        onClick={handleAddImage}
        className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer peer ${
          isSelected ? 'opacity-100 flex justify-end items-start' : 'opacity-0'
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
      <div className="group-hover:opacity-100 opacity-0 absolute left-0 top-0 flex justify-between w-full p-3">
        {!isSelected && (
          <button
            data-tip="delete image"
            className="tooltip tooltip-right"
            onClick={handleRemoveImage}
          >
            <TbTrashFilled
              size={24}
              className="text-white  tooltip-bottom hover:text-red-400 cursor-pointer"
            />
          </button>
        )}
      </div>
      {!isSelected && (
        <button
          onClick={handleSelectImage}
          className="px-4 py-1 hover:brightness-90 rounded-full group-hover:opacity-100 opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white"
        >
          Select
        </button>
      )}
    </div>
  );
}

export default GalleryImage;
