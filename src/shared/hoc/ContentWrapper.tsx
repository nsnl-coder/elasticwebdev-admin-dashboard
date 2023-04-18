import { Children } from '@src/types/shared';

interface Props extends Children {
  className?: string;
}

function ContentWrapper(props: Props): JSX.Element {
  return (
    <div className={`px-12 ${props.className} mx-auto`}>{props.children}</div>
  );
}

export default ContentWrapper;
