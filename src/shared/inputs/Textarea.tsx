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
}

function Textarea(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    errors,
    label,
    placeholder,
    required,
    labelTheme,
    defaultValue,
    children,
  } = props;

  return (
    <div className="w-full">
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        labelTheme={labelTheme}
        required={required}
      />
      <div className="flex gap-x-4">
        <textarea
          id={fieldName}
          {...register(fieldName)}
          className="border border-gray-400/80 h-32 p-2 w-full rounded-md placeholder:text-sm"
          placeholder={placeholder || fieldName}
          defaultValue={defaultValue}
        />
        {children}
      </div>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default Textarea;
