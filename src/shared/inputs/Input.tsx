import { UseFormRegister } from 'react-hook-form';
import Label, { LabelProps, LabelThemes } from '../form/Label';

interface Props extends LabelProps {
  register: UseFormRegister<any>;
  errors: any;
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
    labelTheme,
  } = props;

  return (
    <div className="mb-8">
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        labelTheme={labelTheme}
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
