import SelectFiles from '@src/shared/selectFiles/SelectFiles';
import { useState } from 'react';

export default function Home() {
  const [files, setfiles] = useState<string[]>([]);

  return (
    <div>
      <SelectFiles
        files={files}
        setFiles={setfiles}
        maxFilesCount={4}
        className="max-w-3xl"
      />
    </div>
  );
}
