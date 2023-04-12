import useCreatePresignedUrl from '@src/react-query/files/useCreatePresignedUrl';
import { isError } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FileInfo } from './useSelectFiles';
import useUploadFile from './useUploadFile';

const useUploadFiles = (
  files: FileInfo[],
  setFiles: Dispatch<SetStateAction<FileInfo[]>>,
) => {
  const { createPresignUrl, url, status } = useCreatePresignedUrl();
  const { uploadFile, isUploading, isUploaded } = useUploadFile();

  useEffect(() => {
    if (files.length > 0) {
      createPresignUrl({ size: files[0].size, type: files[0].type });
    }
  }, [files]);

  useEffect(() => {
    if (status !== 'error' && status !== 'success') return;
    if (files.length === 0) return;

    if (url && status === 'success') {
      uploadFile({
        presignedUrl: url,
        file: files[0].file,
        contentType: files[0].type,
      });
    }

    setFiles((prev) => prev.slice(1));
  }, [status, url]);
};

export default useUploadFiles;
