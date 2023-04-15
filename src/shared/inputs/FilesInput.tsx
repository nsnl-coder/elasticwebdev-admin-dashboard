import { Controller, useController } from 'react-hook-form';
import SelectFiles, { SelectFilesProps } from '../selectFiles/SelectFiles';
import { useEffect, useState } from 'react';
import Label from '../form/Label';
import { LabelProps } from '../form/Label';
import ErrorMessage from '../form/ErrorMessage';

interface Props
  extends Omit<SelectFilesProps, 'setFiles' | 'files'>,
    LabelProps {
  control: any;
  errors: any;
}

function FilesInput(props: Props): JSX.Element {
  const {
    fieldName,
    label,
    control,
    errors,
    maxFilesCount,
    labelTheme,
    required = false,
    allowedTypes,
  } = props;

  const [files, setFiles] = useState<string[]>([]);
  const { field } = useController({ name: fieldName, control });

  useEffect(() => {
    if (!files.length) return;

    if (maxFilesCount === 1) {
      field.onChange(files[0]);
      return;
    }
    field.onChange(files);
  }, [files]);

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
        render={({ field }) => (
          <SelectFiles
            allowedTypes={allowedTypes}
            files={files}
            setFiles={setFiles}
            maxFilesCount={maxFilesCount}
          />
        )}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default FilesInput;
