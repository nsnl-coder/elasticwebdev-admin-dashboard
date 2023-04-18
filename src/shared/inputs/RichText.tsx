import Editor from '../editor/Editor';
import { Controller, Control } from 'react-hook-form';
import Label, { LabelProps } from '../form/Label';
import ErrorMessage from '../form/ErrorMessage';

interface Props extends LabelProps {
  control: Control<any, any>;
  defaultValue?: string | undefined;
  errors: any;
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
        labelTheme={labelTheme}
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
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default RichText;
