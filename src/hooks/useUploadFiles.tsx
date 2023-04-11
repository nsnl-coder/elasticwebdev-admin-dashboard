import { useEffect, useState } from 'react';

interface FileInfo {
  url: string;
  name: string;
  size: number;
  type: string;
}

function useUploadFiles() {
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {}, []);

  return { files, setFiles };
}

export default useUploadFiles;
export type { FileInfo };
