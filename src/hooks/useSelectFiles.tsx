import { toastError } from '@src/utils/toast';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FileInfo {
  url: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

function useSelectFiles() {
  const [files, setFiles] = useState<FileInfo[]>([]);

  const selectFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      selectFile(files[i]);
    }
  };

  const selectFile = (file: File) => {
    if (!file.type.startsWith('image') && !file.type.startsWith('video')) {
      toastError('Please select image or video files only!');
      return;
    }

    if (file.type.startsWith('image') && file.size > 1024 * 1024) {
      toastError('Please select images under 1mb!');
      return;
    }
    if (file.type.startsWith('video') && file.size > 50 * 1024 * 1024) {
      toastError('Please select videos under 50mb!');
      return;
    }

    setFiles((prev) => [
      ...prev,
      {
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
        size: file.size,
        file,
      },
    ]);
  };

  const removeFile = (url: string) => {
    setFiles((prev) => prev.filter((fileinfo) => fileinfo.url !== url));
    URL.revokeObjectURL(url);
  };

  const pinFile = (pinnedFile: FileInfo) => {
    setFiles((prev) => {
      const otherFiles = prev.filter((file) => file.url !== pinnedFile.url);
      return [pinnedFile, ...otherFiles];
    });
  };

  return { selectFiles, removeFile, files, pinFile };
}

export default useSelectFiles;
export type { FileInfo };
