import { Dispatch, SetStateAction } from 'react';
import { Option } from './MultipleSelect';

interface Props {
  option: Option;
  setSelectedOptions: Dispatch<SetStateAction<Option[]>>;
  selectedOptions: Option[];
}

function MultipleSelectItem(props: Props): JSX.Element {
  const { option, setSelectedOptions, selectedOptions } = props;

  const handleToggleSelection = () => {
    setSelectedOptions((prev) => {
      const index = prev.findIndex((o) => o.id === option.id);
      if (index === -1) return [...prev, option];
      else {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      }
    });
  };

  const isChecked = selectedOptions.findIndex((o) => o.id === option.id) !== -1;

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
