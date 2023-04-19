import { Children } from '@src/types/shared';

interface Props extends Children {
  className?: string;
}

function CreatePageWrapper(props: Props): JSX.Element {
  return (
    <div className={`px-6 ${props.className} mx-auto max-w-5xl pb-16`}>
      {props.children}
    </div>
  );
}

export default CreatePageWrapper;
