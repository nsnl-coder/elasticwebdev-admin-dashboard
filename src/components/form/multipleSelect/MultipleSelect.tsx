import { AiOutlineDown } from 'react-icons/ai';
import MultipleSelectItem from './MultipleSelectItem';
import { useState } from 'react';
import Label, { LabelProps } from '../Label';
import SelectedOptions from './SelectedOptions';
import ErrorMessage from '../ErrorMessage';
import { useController } from 'react-hook-form';

export interface Option {
  name?: string;
  id?: string;
}

interface Props extends LabelProps {
  errors: any;
  options: Option[] | undefined;
  fieldName: string;
  control: any;
  tooltip?: string;
  excludes?: string[] | undefined;
}

function MultipleSelect(props: Props): JSX.Element {
  const {
    options = [],
    excludes = [],
    required,
    fieldName,
    labelTheme,
    label,
    errors,
    control,
    tooltip,
  } = props;

  const [keyword, setKeyword] = useState<string>('');
  const [focusList, setFocusList] = useState(false);

  const matchedOptions = options.filter(
    (option) =>
      option.name?.toLowerCase().includes(keyword.toLowerCase()) &&
      option.id &&
      !excludes.includes(option.id),
  );

  const { field } = useController({ name: fieldName, control });
  const selectedOptions: string[] = field.value || [];

  const setSelectedOptions = (fn: (options: string[]) => string[]) => {
    const newOptions = fn(selectedOptions);
    field.onChange(newOptions);
  };

  return (
    <div className="w-full">
      <Label
        fieldName={fieldName}
        labelTheme={labelTheme}
        label={label}
        required={required}
        tooltip={tooltip}
      />

      <div className="dropdown w-full">
        <label tabIndex={0} className="group">
          <div className="py-2 px-4 border rounded-md ">
            <input
              type="text"
              className={`w-full absolute opacity-0 focus:relative focus:opacity-100 outline-none mb-2 px-0.5 group-focus:opacity-100 group-focus:relative ${
                focusList ? 'relative opacity-100' : ''
              }`}
              placeholder="type something..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex items-center justify-between cursor-pointer">
              <SelectedOptions
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
                options={options}
              />
              <span>
                <AiOutlineDown />
              </span>
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          onFocus={() => setFocusList(true)}
          onBlur={() => setFocusList(false)}
          className="dropdown-content w-full mt-0.5 bg-white border py-4 max-h-44 overflow-auto small-scrollbar shadow-xl rounded-md"
        >
          {matchedOptions.map((option) => (
            <MultipleSelectItem
              key={option.id}
              option={option}
              setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions}
            />
          ))}
          {matchedOptions.length === 0 && (
            <li className="px-4 py-2">Cant not find any items!</li>
          )}
        </ul>
      </div>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default MultipleSelect;
