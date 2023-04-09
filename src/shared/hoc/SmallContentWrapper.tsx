import { Children } from '@src/types/shared';

interface Props extends Children {
  className?: string;
}

function SmallContentWrapper(props: Props): JSX.Element {
  return (
    <div className={`max-w-4xl mx-auto border ${props.className}`}>
      {props.children}
    </div>
  );
}

export default SmallContentWrapper;
