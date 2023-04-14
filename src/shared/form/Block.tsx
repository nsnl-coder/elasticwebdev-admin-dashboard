import { Children } from '@src/types/shared';

function Block(props: Children): JSX.Element {
  return (
    <div className={'w-full rounded-md p-5 shadow-md bg-white'}>
      {props.children}
    </div>
  );
}

export default Block;
