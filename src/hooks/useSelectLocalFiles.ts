import { imageExtensions, videoExtensions } from '@src/utils/imageOrVideo';
import { toastError } from '@src/utils/toast';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FileInfo {
  url: string;
  file: File;
}

function useSelectLocalFiles() {
  const [localFiles, setLocalFiles] = useState<FileInfo[]>([]);

  const selectLocalFiles = (localFiles: FileList) => {
    for (let i = 0; i < localFiles.length; i++) {
      selectFile(localFiles[i]);
    }
  };

  const isSupportedFileType = (fileType: string) => {
    let extension = fileType.split('/')[1];

    if (fileType.startsWith('image') && !imageExtensions.includes(extension)) {
      toastError(`Supported images types: ${imageExtensions.join(', ')}`);
      return false;
    }

    if (fileType.startsWith('video') && !videoExtensions.includes(extension)) {
      toastError(`Supported video types: ${videoExtensions.join(', ')}`);
      return false;
    }

    return true;
  };

  const selectFile = (file: File) => {
    if (!file.type.startsWith('image') && !file.type.startsWith('video')) {
      toastError('Please select image or video files only!');
      return;
    }

    const supportTypes = isSupportedFileType(file.type);

    if (!supportTypes) return;

    if (file.type.startsWith('image') && file.size > 1024 * 1024) {
      toastError('Please select images under 1mb!');
      return;
    }
    if (file.type.startsWith('video') && file.size > 50 * 1024 * 1024) {
      toastError('Please select videos under 50mb!');
      return;
    }

    setLocalFiles((prev) => [
      ...prev,
      {
        url: URL.createObjectURL(file),
        file,
      },
    ]);
  };

  const removeFile = (url: string) => {
    setLocalFiles((prev) => prev.filter((fileinfo) => fileinfo.url !== url));
    URL.revokeObjectURL(url);
  };

  const pinFile = (pinnedFile: FileInfo) => {
    setLocalFiles((prev) => {
      const otherFiles = prev.filter((file) => file.url !== pinnedFile.url);
      return [pinnedFile, ...otherFiles];
    });
  };

  return { selectLocalFiles, removeFile, localFiles, setLocalFiles };
}

export default useSelectLocalFiles;
export type { FileInfo };
