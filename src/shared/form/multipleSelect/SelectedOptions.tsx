import { IoMdClose } from 'react-icons/io';
import { Option } from './MultipleSelect';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  selectedOptions: Option[];
  setSelectedOptions: Dispatch<SetStateAction<Option[]>>;
}

function SelectedOptions(props: Props): JSX.Element {
  const { selectedOptions, setSelectedOptions } = props;

  const handleRemoveSelection = (id: string | undefined) => {
    if (!id) return;

    setSelectedOptions((prev) => {
      return prev.filter((o) => o.id !== id);
    });
  };

  return (
    <div className="flex gap-1.5 flex-wrap">
      {selectedOptions.map((option) => (
        <div
          key={option.id}
          className="rounded-full border px-3 leading-3 py-1 flex items-center cursor-pointer hover:bg-gray-100"
        >
          {option.name}
          <span
            onClick={() => handleRemoveSelection(option.id)}
            className="px-2 hover:text-red-400"
          >
            <IoMdClose />
          </span>
        </div>
      ))}
      {selectedOptions.length === 0 && (
        <div className="text-gray-700/70 multiple-select-text">Select one</div>
      )}
    </div>
  );
}

export default SelectedOptions;
