import Tiptap from '@src/shared/editor/Editor';
import SmallContentWrapper from '@src/shared/hoc/SmallContentWrapper';
import SelectFiles from '@src/shared/selectFiles/SelectFiles';

function Create(): JSX.Element {
  return (
    <SmallContentWrapper className="bg-white">
      {/* <Tiptap /> */}
      <SelectFiles />
    </SmallContentWrapper>
  );
}

export default Create;
