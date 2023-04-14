import Editor from '@src/shared/editor/Editor';
import SelectFiles from '@src/shared/selectFiles/SelectFiles';
import { useState } from 'react';

export default function Home() {
  const [files, setfiles] = useState<string[]>([]);

  return (
    <div>
      <Editor />
      <SelectFiles
        files={files}
        setFiles={setfiles}
        maxFilesCount={4}
        className="max-w-3xl"
      />
    </div>
  );
}
