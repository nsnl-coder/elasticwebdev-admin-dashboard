import { UseFormRegister } from 'react-hook-form';
import Label, { LabelProps } from '../form/Label';
import ErrorMessage from '../form/ErrorMessage';
import { Children } from '@src/types/shared';

interface Props extends LabelProps, Children {
  register: UseFormRegister<any>;
  errors: any;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  minLength?: number;
  maxLength?: number;
}

function Input(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    errors,
    label,
    placeholder,
    required,
    type = 'text',
    labelTheme,
    defaultValue,
    children,
    className,
    tooltip,
    ...inputProps
  } = props;

  return (
    <div className="w-full">
      <Label
        fieldName={fieldName}
        label={label}
        labelTheme={labelTheme}
        required={required}
        tooltip={tooltip}
      />
      <div className="flex gap-x-4">
        <input
          {...inputProps}
          type={type}
          id={fieldName}
          {...register(fieldName)}
          className={`${className} border border-gray-400/80 h-10 px-3 w-full rounded-md placeholder:text-sm ${
            errors[fieldName] ? 'border border-red-400' : ''
          }`}
          placeholder={placeholder || fieldName}
          defaultValue={defaultValue}
        />
        {children}
      </div>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default Input;
