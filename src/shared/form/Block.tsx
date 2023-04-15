import { Children } from '@src/types/shared';

interface Props extends Children {
  blockTitle?: string;
  className?: string;
}

function Block(props: Props): JSX.Element {
  const { blockTitle, className } = props;

  return (
    <div
      className={`w-full rounded-lg p-5 shadow-lg bg-white space-y-6 ${className}`}
    >
      <h2 className="font-medium">{blockTitle}</h2>
      {props.children}
    </div>
  );
}

export default Block;
