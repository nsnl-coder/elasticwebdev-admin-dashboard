import { ChangeEvent } from 'react';

interface Props {
  selectFiles: (file: FileList) => void;
}

function HiddenInput(props: Props): JSX.Element {
  const { selectFiles } = props;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) selectFiles(e.target.files);
    if (e.target.value) {
      e.target.value = '';
    }
  };

  return (
    <input
      className="hidden"
      onChange={handleImageChange}
      type="file"
      id="upload_files"
      accept="image/*,video/*"
      multiple
    />
  );
}

export default HiddenInput;
