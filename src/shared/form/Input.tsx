import { UseFormRegister } from 'react-hook-form';

interface Props {
  fieldName: string;
  register: UseFormRegister<any>;
  errors: any;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

function Input(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    errors,
    label,
    placeholder,
    required = true,
    type = 'text',
  } = props;

  return (
    <div className="mb-8">
      <label
        htmlFor={fieldName}
        className="capitalize flex gap-x-1 text-sm mb-3"
      >
        <span> {label || fieldName}</span>
        {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        id={fieldName}
        {...register(fieldName)}
        className="border border-gray-400/80 h-10 px-3 w-full rounded-md"
        placeholder={placeholder || fieldName}
      />
      <p className="text-sm text-red-400 mt-1">{errors[fieldName]?.message}</p>
    </div>
  );
}

export default Input;
