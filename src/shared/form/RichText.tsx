import Collection from '@src/types/collection';
import Editor from '../editor/Editor';
import { Controller, Control } from 'react-hook-form';

interface Props {
  control: Control<any, any>;
  fieldName: string;
  defaultValue: string;
}

function RichText(props: Props): JSX.Element {
  const { fieldName, control, defaultValue = '' } = props;
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Editor defaultValue={defaultValue} onChange={field.onChange} />
      )}
    />
  );
}

export default RichText;
