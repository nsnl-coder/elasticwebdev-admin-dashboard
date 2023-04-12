import { useEffect, useState } from 'react';

interface FileInfo {
  url: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

function useUploadFiles() {
  const [files, setFiles] = useState<FileInfo[]>([]);

  const selectNewFile = (file: File) => {
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

  return { selectNewFile, removeFile, files, pinFile };
}

export default useUploadFiles;
export type { FileInfo };
