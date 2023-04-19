import { IoMdClose } from 'react-icons/io';
import { Option } from './MultipleSelect';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  selectedOptions: string[];
  setSelectedOptions: (fn: (options: string[]) => string[]) => void;
  options: Option[];
}

function SelectedOptions(props: Props): JSX.Element {
  const { selectedOptions, setSelectedOptions, options } = props;

  const handleRemoveSelection = (id: string | undefined) => {
    if (!id) return;

    setSelectedOptions((prev) => {
      return prev.filter((option) => option !== id);
    });
  };

  const foundOptions = options.filter(
    (option) => option.id && selectedOptions.includes(option.id),
  );

  const optionIds = options.map((option) => option.id);

  const notFoundOptions: Option[] = selectedOptions
    .filter((option) => !optionIds.includes(option))
    .map((option) => ({
      id: option,
      name: 'Not found',
    }));

  const allOptions = [...foundOptions, ...notFoundOptions];

  return (
    <div className="flex gap-1.5 flex-wrap">
      {allOptions.map((option) => (
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
