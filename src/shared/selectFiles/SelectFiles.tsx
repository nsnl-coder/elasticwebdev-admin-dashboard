import { Dispatch, SetStateAction, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
//
import useUploadFiles from '@src/hooks/useUploadFiles';
import useSelectLocalFiles from '@src/hooks/useSelectLocalFiles';
import { AllowedFilesTypes } from '@src/contexts/GalleryContextProvider';

//
import FileWrapper from './FileWrapper';
import SelectFromGallery from './SelectFromGallery';
import HiddenInput from './HiddenInput';
import Label from './Label';
import FilePreview from '../filePreview/FilePreview';

interface SelectFilesProps {
  files: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
  maxFilesCount: number;
  allowedTypes: AllowedFilesTypes;
  className?: string;
}

function SelectFiles(props: SelectFilesProps): JSX.Element {
  const { files, setFiles, className, maxFilesCount, allowedTypes } = props;
  const { localFiles, setLocalFiles, selectLocalFiles } = useSelectLocalFiles();

  const {
    key,
    isUploading,
    resetCreatePresignedUrl,
    isUploaded,
    resetUploadFile,
  } = useUploadFiles(localFiles, setLocalFiles);

  useEffect(() => {
    if (!isUploaded) return;

    if (key) {
      setFiles((prev) => [...prev, key]);
      resetCreatePresignedUrl();
      resetUploadFile();
    }
  }, [key, isUploaded]);

  const isMaxFilesCount = files.length >= maxFilesCount;

  return (
    <div
      className={`${className} ${
        maxFilesCount > 3 ? 'shadow-lg rounded-md p-6 my-12' : ''
      } mx-auto bg-white  `}
    >
      <div
        className={`gap-4 grid ${
          maxFilesCount > 3 ? 'grid-cols-4' : 'grid-cols-2 '
        }`}
      >
        <HiddenInput id="select_file" selectFiles={selectLocalFiles} />
        {files.map((s3Key, index) => (
          <FileWrapper
            key={s3Key}
            s3Key={s3Key}
            index={index}
            setFiles={setFiles}
          >
            <FilePreview src={s3Key} type="unknown" />
          </FileWrapper>
        ))}
        {isUploading && <Skeleton count={1} className="h-full" />}
        {!isMaxFilesCount && (
          <SelectFromGallery
            allowedTypes={allowedTypes}
            files={files}
            setFiles={setFiles}
            className="aspect-square"
            maxFilesCount={maxFilesCount}
            currentFilesCount={files.length}
          />
        )}
        {!isMaxFilesCount && (
          <Label htmlFor="select_file" className="aspect-square" />
        )}
      </div>
    </div>
  );
}

export default SelectFiles;
export type { SelectFilesProps };
