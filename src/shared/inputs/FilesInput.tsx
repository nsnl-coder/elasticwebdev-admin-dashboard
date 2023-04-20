import { useController } from 'react-hook-form';
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

  const { field } = useController({ name: fieldName, control });

  const setFiles = (fn: (files: string[]) => string[]) => {
    const updatedFiles = fn(files);

    if (maxFilesCount === 1) {
      field.onChange(updatedFiles.at(-1));
      return;
    }

    field.onChange(updatedFiles);
  };

  let files = field.value || [];

  if (typeof field.value === 'string') {
    files = [files];
  }

  return (
    <div>
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        labelTheme={labelTheme}
        required={required}
      />
      <SelectFiles
        allowedTypes={allowedTypes}
        files={files}
        setFiles={setFiles}
        maxFilesCount={maxFilesCount}
        fieldName={fieldName}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default FilesInput;
