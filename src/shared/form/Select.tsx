import { UseFormRegister } from 'react-hook-form';

interface Option {
  name: string;
  value: string;
}

interface Props {
  fieldName: string;
  register: UseFormRegister<any>;
  errors: any;
  label?: string;
  required?: boolean;
  options: string[] | Option[];
}

function Select(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    errors,
    label,
    required = true,
    options,
  } = props;

  return (
    <div>
      <label
        htmlFor={fieldName}
        className="capitalize flex gap-x-1 text-sm mb-3"
      >
        <span>{label || fieldName}</span>
        {required && <span className="text-red-400">*</span>}
      </label>
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
