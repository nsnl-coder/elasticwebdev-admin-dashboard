import { Dispatch, SetStateAction } from 'react';
import { Option } from './MultipleSelect';

interface Props {
  option: Option;
  setSelectedOptions: (fn: (options: string[]) => string[]) => void;
  selectedOptions: string[];
}

function MultipleSelectItem(props: Props): JSX.Element {
  const { option, setSelectedOptions, selectedOptions } = props;

  const handleToggleSelection = () => {
    setSelectedOptions((prev) => {
      const index = prev.findIndex((id) => id === option.id);
      if (!option.id) return prev;

      if (index === -1) return [...prev, option.id];
      else {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      }
    });
  };

  const isChecked = selectedOptions.findIndex((id) => id === option.id) !== -1;

  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-x-4"
      onClick={() => handleToggleSelection()}
    >
      <input
        type="checkbox"
        className="checkbox checkbox-sm rounded-md"
        checked={isChecked}
        readOnly
      />
      <span>{option.name}</span>
    </div>
  );
}

export default MultipleSelectItem;
