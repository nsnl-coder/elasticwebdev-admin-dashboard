import useCreatePresignedUrl from '@src/react-query/files/useCreatePresignedUrl';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FileInfo } from '../../hooks/useSelectLocalFiles';
import useUploadFile from './useUploadFile';

/**
 * this hook accept state and setState as arguement!
 * this hook will create a signed url then upload it until files in state is empty
 * use useUpload & useCreatePresignedUrl hooks under the hood
 */

const useUploadFiles = (
  localFiles: FileInfo[],
  setLocalFiles: Dispatch<SetStateAction<FileInfo[]>>,
) => {
  const {
    createPresignUrl,
    presignUrl,
    status,
    isCreating,
    key,
    resetCreatePresignedUrl,
  } = useCreatePresignedUrl();

  const { uploadFile, isUploaded, isUploading, resetUploadFile } =
    useUploadFile();

  useEffect(() => {
    if (localFiles.length > 0) {
      createPresignUrl({
        size: localFiles[0].file.size,
        type: localFiles[0].file.type,
      });
    }
  }, [localFiles, createPresignUrl]);

  useEffect(() => {
    if (status !== 'error' && status !== 'success') return;
    if (localFiles.length === 0) return;

    if (presignUrl && status === 'success') {
      uploadFile({
        presignedUrl: presignUrl,
        file: localFiles[0].file,
        contentType: localFiles[0].file.type,
      });
    }

    setLocalFiles((prev) => prev.slice(1));
  }, [status, presignUrl, localFiles, setLocalFiles, uploadFile]);

  return {
    isUploaded,
    isUploading: isCreating || isUploading,
    resetUploadFile,
    key,
    resetCreatePresignedUrl,
  };
};

export default useUploadFiles;
