import { UseFormRegister } from 'react-hook-form';
import Label, { LabelProps } from '../form/Label';
import ErrorMessage from '../form/ErrorMessage';

interface Option {
  name: string;
  value: string;
}

interface Props extends LabelProps {
  register: UseFormRegister<any>;
  errors: any;
  options: string[] | Option[];
  defaultValue?: string;
  className?: string;
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
    className,
    tooltip,
    defaultValue,
  } = props;

  return (
    <div className="w-full">
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        labelTheme={labelTheme}
        required={required}
        tooltip={tooltip}
      />
      <select
        {...register(fieldName)}
        id={fieldName}
        className={`select select-bordered h-10 min-h-0 w-full rounded-md text-sm font-normal ${className} ${
          errors[fieldName] ? 'border-red-400' : ''
        }`}
        defaultValue={defaultValue}
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
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default Select;
