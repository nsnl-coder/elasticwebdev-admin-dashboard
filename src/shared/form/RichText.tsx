import Editor from '../editor/Editor';
import { Controller, Control } from 'react-hook-form';
import Label, { LabelThemes } from './Label';

interface Props {
  control: Control<any, any>;
  fieldName: string;
  defaultValue: string;
  errors: any;
  label?: string;
  labelTheme: LabelThemes;
  required?: boolean;
}

function RichText(props: Props): JSX.Element {
  const {
    fieldName,
    control,
    errors,
    defaultValue = '',
    required = false,
    label,
    labelTheme,
  } = props;

  return (
    <div>
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        theme={labelTheme}
        required={required}
      />
      <Controller
        name={fieldName}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Editor defaultValue={defaultValue} onChange={field.onChange} />
        )}
      />
      <p className="text-sm text-red-400 mt-1">{errors[fieldName]?.message}</p>
    </div>
  );
}

export default RichText;
