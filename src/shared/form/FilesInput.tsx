import { Controller, useController } from 'react-hook-form';
import SelectFiles, { SelectFilesProps } from '../selectFiles/SelectFiles';
import { useEffect, useState } from 'react';

interface Props extends Omit<SelectFilesProps, 'setFiles' | 'files'> {
  fieldName: string;
  control: any;
  errors: any;
  label?: string;
}

function FilesInput(props: Props): JSX.Element {
  const [files, setFiles] = useState<string[]>([]);
  const { fieldName, label, control, errors, maxFilesCount } = props;

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
      <h3 className="font-semibold mb-6 text-lg capitalize">
        {label || fieldName}
      </h3>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <SelectFiles
            allowedTypes={props.allowedTypes}
            files={files}
            setFiles={setFiles}
            maxFilesCount={props.maxFilesCount}
          />
        )}
      />
      <p className="text-sm text-red-400 mt-1">{errors[fieldName]?.message}</p>
    </div>
  );
}

export default FilesInput;
