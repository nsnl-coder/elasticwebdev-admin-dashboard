import SwapWrapper from '@src/shared/swapWrapper/SwapWrapper';
import { DRAG_TYPES } from '@src/types/enum';
import { Menu } from '@src/yup/menuSchema';

interface Props {
  menu: Menu;
  swapPosition: (id1: string, id2: string) => void;
}

function ChildMenu(props: Props): JSX.Element | null {
  const { menu, swapPosition } = props;

  if (!menu._id) return null;

  return (
    <SwapWrapper
      itemType={DRAG_TYPES.MENU}
      id={menu._id}
      swapPosition={swapPosition}
      swapOn="hover"
    >
      <div>{menu.name}</div>
    </SwapWrapper>
  );
}

export default ChildMenu;
