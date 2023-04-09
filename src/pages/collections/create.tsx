import Tiptap from '@src/shared/editor/Editor';
import SmallContentWrapper from '@src/shared/hoc/SmallContentWrapper';

function Create(): JSX.Element {
  return (
    <SmallContentWrapper className="bg-white">
      <Tiptap />
    </SmallContentWrapper>
  );
}

export default Create;
