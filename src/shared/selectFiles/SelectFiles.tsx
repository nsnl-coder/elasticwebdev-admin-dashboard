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
}

function SelectFiles(props: Props): JSX.Element {
  const { files, setFiles } = props;
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

  return (
    <div>
      <HiddenInput id="select_file" selectFiles={selectLocalFiles} />
      <div className="grid grid-cols-4 max-w-3xl gap-4 bg-white p-6 mx-auto my-12 shadow-lg rounded-mdc">
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
        <Label htmlFor="select_file" className="aspect-square" />
        <SelectFromGallery setFiles={setFiles} className="aspect-square" />
      </div>
    </div>
  );
}

export default SelectFiles;
