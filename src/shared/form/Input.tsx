import { UseFormRegister } from 'react-hook-form';
import Label, { LabelThemes } from './Label';

interface Props {
  fieldName: string;
  register: UseFormRegister<any>;
  errors: any;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  labelTheme: LabelThemes;
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
    labelTheme,
  } = props;

  return (
    <div className="mb-8">
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        theme={labelTheme}
        required={required}
      />
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
