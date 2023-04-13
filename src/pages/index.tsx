import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import SelectFiles from '@src/shared/selectFiles/SelectFiles';
import { useState } from 'react';

export default function Home() {
  const [files, setfiles] = useState<string[]>([]);

  return (
    <div>
      <SelectFiles files={files} setFiles={setfiles} />
    </div>
  );
}
