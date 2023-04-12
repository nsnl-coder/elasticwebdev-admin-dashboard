import useSelectFiles from '@src/hooks/useSelectFiles';
import PreviewImage from './PreviewImage';
import SelectFromGallery from './SelectFromGallery';
import UploadInput from './HiddenInput';
import UploadLabel from './Label';

function SelectFiles(): JSX.Element {
  const { files, selectNewFile, removeFile, pinFile } = useSelectFiles();

  return (
    <div>
      <UploadInput selectNewFile={selectNewFile} />
      <div className="grid grid-cols-4 max-w-5xl gap-4">
        {files.map((fileinfo, index) => (
          <PreviewImage
            key={fileinfo.url}
            fileinfo={fileinfo}
            index={index}
            removeFile={removeFile}
            pinFile={pinFile}
          />
        ))}

        <UploadLabel className="aspect-square" />
        <SelectFromGallery className="aspect-square" />
      </div>
    </div>
  );
}

export default SelectFiles;
