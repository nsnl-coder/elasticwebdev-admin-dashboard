import { ChangeEvent } from 'react';

interface Props {
  selectNewFile: (file: File) => void;
}

function HiddenInput(props: Props): JSX.Element {
  const { selectNewFile } = props;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) selectNewFile(selectedImage);
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

export default HiddenInput;
