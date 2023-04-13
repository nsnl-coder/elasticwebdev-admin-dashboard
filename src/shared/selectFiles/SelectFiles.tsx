import FileWrapper from './FileWrapper';
import SelectFromGallery from './SelectFromGallery';
import HiddenInput from './HiddenInput';
import Label from './Label';
import FilePreview from '../filePreview/FilePreview';
import useSelectLocalFiles from '@src/hooks/useSelectLocalFiles';
import useUploadFiles from '@src/hooks/useUploadFiles';

function SelectFiles(): JSX.Element {
  const { files, selectFiles, removeFile, pinFile } = useSelectLocalFiles();

  return (
    <div>
      <HiddenInput id="select_file" selectFiles={selectFiles} />
      <div className="grid grid-cols-4 max-w-5xl gap-4">
        {files.map((fileinfo, index) => (
          <FileWrapper
            key={fileinfo.url}
            fileinfo={fileinfo}
            index={index}
            removeFile={removeFile}
            pinFile={pinFile}
          >
            <FilePreview src={fileinfo.url} type={fileinfo.type} />
          </FileWrapper>
        ))}

        <Label htmlFor="select_file" className="aspect-square" />
        <SelectFromGallery className="aspect-square" />
      </div>
    </div>
  );
}

export default SelectFiles;
