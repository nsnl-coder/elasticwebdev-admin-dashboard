import useUploadFiles from '@src/hooks/useUploadFiles';
import UploadInput from '../uploadFiles/HiddenInput';
import UploadLabel from '../uploadFiles/Label';

function GalleryUpload(): JSX.Element {
  const { setFiles } = useUploadFiles();

  return (
    <div>
      <UploadInput setFiles={setFiles} />
      <div className="grid grid-cols-4 max-w-5xl gap-4">
        <UploadLabel className="aspect-square" />
      </div>
    </div>
  );
}

export default GalleryUpload;
