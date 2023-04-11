import { FileInfo } from '@src/hooks/useUploadFiles';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface Props {
  setFiles: Dispatch<SetStateAction<FileInfo[]>>;
}

function UploadInput(props: Props): JSX.Element {
  const { setFiles } = props;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      setFiles((prev) => [
        ...prev,
        {
          url: URL.createObjectURL(selectedImage),
          name: selectedImage.name,
          type: selectedImage.type,
          size: selectedImage.size,
        },
      ]);
    }
  };

  return (
    <input
      onChange={handleImageChange}
      type="file"
      id="upload_files"
      accept="images/*"
      className="hidden"
    />
  );
}

export default UploadInput;
