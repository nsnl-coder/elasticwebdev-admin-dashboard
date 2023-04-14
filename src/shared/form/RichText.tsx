import Collection from '@src/types/collection';
import Editor from '../editor/Editor';
import { Controller, Control } from 'react-hook-form';

interface Props {
  control: Control<any, any>;
  fieldName: string;
  defaultValue: string;
  errors: any;
}

function RichText(props: Props): JSX.Element {
  const { fieldName, control, errors, defaultValue = '' } = props;
  return (
    <div>
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
