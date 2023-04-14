import { Dispatch, SetStateAction, useEffect } from 'react';
//
import useUploadFiles from '@src/hooks/useUploadFiles';
import FileWrapper from './FileWrapper';
import SelectFromGallery from './SelectFromGallery';
import HiddenInput from './HiddenInput';
import Label from './Label';
import FilePreview from '../filePreview/FilePreview';
import useSelectLocalFiles from '@src/hooks/useSelectLocalFiles';
import Skeleton from 'react-loading-skeleton';

interface Props {
  files: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
  maxFilesCount: number;
  className?: string;
  heading?: string;
}

function SelectFiles(props: Props): JSX.Element {
  const {
    files,
    setFiles,
    className,
    maxFilesCount,
    heading = 'Media',
  } = props;
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
      className={`${className} mx-auto bg-white p-6 my-12 shadow-lg rounded-md`}
    >
      <h3 className="font-semibold mb-6 text-lg capitalize">{heading}</h3>
      <div className={`gap-4 ${maxFilesCount > 1 ? 'grid grid-cols-4' : ''}`}>
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
