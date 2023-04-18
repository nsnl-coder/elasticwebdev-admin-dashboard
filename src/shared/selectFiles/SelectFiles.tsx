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
  const { files, setFiles, maxFilesCount, allowedTypes } = props;
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

  const swapPosition = (dragKey: string, dropKey: string) => {
    setFiles((files) => {
      const copyFiles = [...files];

      const dragIndex = copyFiles.findIndex((s3Key) => s3Key === dragKey);
      const dropIndex = copyFiles.findIndex((s3Key) => s3Key === dropKey);

      if (dragIndex === -1 || dropIndex == -1) return files;

      [copyFiles[dragIndex], copyFiles[dropIndex]] = [
        copyFiles[dropIndex],
        copyFiles[dragIndex],
      ];

      return copyFiles;
    });
  };

  return (
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
          swapPosition={swapPosition}
        >
          <FilePreview src={s3Key} fallback="text" />
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
  );
}

export default SelectFiles;
export type { SelectFilesProps };
