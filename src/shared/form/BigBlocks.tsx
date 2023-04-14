import { Children } from '@src/types/shared';

function BigBlock(props: Children): JSX.Element {
  return (
    <div className="max-w-2xl w-full gap-y-5 flex flex-col">
      {props.children}
    </div>
  );
}

export default BigBlock;
