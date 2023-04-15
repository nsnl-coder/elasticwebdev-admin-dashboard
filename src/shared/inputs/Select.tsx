import { UseFormRegister } from 'react-hook-form';
import Label, { LabelProps } from '../form/Label';

interface Option {
  name: string;
  value: string;
}

interface Props extends LabelProps {
  register: UseFormRegister<any>;
  errors: any;
  options: string[] | Option[];
}

function Select(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    errors,
    label,
    required = false,
    options,
    labelTheme,
  } = props;

  return (
    <div>
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        labelTheme={labelTheme}
        required={required}
      />
      <select
        {...register(fieldName)}
        id={fieldName}
        className="select select-bordered h-10 min-h-0 w-full rounded-md"
      >
        {options.map((option) => {
          if (typeof option === 'string') {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          } else {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          }
        })}
      </select>
      <p className="text-sm text-red-400 mt-1">{errors[fieldName]?.message}</p>
    </div>
  );
}

export default Select;
