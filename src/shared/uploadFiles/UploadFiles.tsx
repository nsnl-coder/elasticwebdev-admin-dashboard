import useUploadFiles from '@src/hooks/useUploadFiles';
import PreviewImage from './PreviewImage';
import SelectFromGallery from './SelectFromGallery';
import UploadInput from './UploadInput';
import UploadLabel from './UploadLabel';

function UploadFiles(): JSX.Element {
  const { files, setFiles } = useUploadFiles();

  return (
    <div>
      <UploadInput setFiles={setFiles} />
      <div className="grid grid-cols-4 max-w-5xl gap-4">
        {files.map((fileinfo, index) => (
          <PreviewImage
            key={fileinfo.url}
            fileinfo={fileinfo}
            index={index}
            setFiles={setFiles}
          />
        ))}

        <UploadLabel className="aspect-square" />
        <SelectFromGallery className="aspect-square" />
      </div>
    </div>
  );
}

export default UploadFiles;
