import SwapWrapper from '@src/shared/swapWrapper/SwapWrapper';
import { DRAG_TYPES } from '@src/types/enum';
import { Menu } from '@src/yup/menuSchema';
import { AiFillDelete } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

interface Props {
  menu: Menu;
  index: number;
  removeMenu: (removeId: string) => void;
  swapPosition: (id1: string, id2: string) => void;
}

function ChildMenu(props: Props): JSX.Element | null {
  const { menu, swapPosition, index, removeMenu } = props;

  if (!menu._id) return null;

  return (
    <SwapWrapper
      itemType={DRAG_TYPES.MENU}
      id={menu._id}
      swapPosition={swapPosition}
      swapOn="hover"
      payload={{ name: menu.name, index }}
    >
      <div className="h-12 flex items-center gap-x-4 justify-between bg-slate-50 px-6 cursor-pointer">
        <div className="flex gap-x-6">
          <span className="w-6 flex text-sm items-center justify-center aspect-square rounded-full">
            {index + 1}
          </span>
          <span>{menu.name}</span>
        </div>
        <div className="flex items-center gap-x-4">
          <AiFillDelete
            size={22}
            className="hover:text-red-400 cursor-pointer"
            onClick={() => menu._id && removeMenu(menu._id)}
          />
          <TbGridDots size={22} className="cursor-pointer" />
        </div>
      </div>
    </SwapWrapper>
  );
}

export default ChildMenu;
