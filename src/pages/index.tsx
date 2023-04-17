import SelectFiles from '@src/shared/selectFiles/SelectFiles';
import { useState } from 'react';

export default function Home() {
  const [files, setfiles] = useState<string[]>([]);

  return (
    <div className="max-w-2xl mx-auto border p-6">
      <SelectFiles
        files={files}
        setFiles={setfiles}
        maxFilesCount={4}
        allowedTypes="*"
      />
    </div>
  );
}
