import { Menu } from '@src/yup/menuSchema';
import { useController } from 'react-hook-form';
import ChildMenu from './ChildMenu';

interface Props {
  control: any;
  menus: Menu[] | undefined;
}

function ChildMenus(props: Props): JSX.Element {
  const { control, menus = [] } = props;

  const { field } = useController({ control, name: 'childMenus' });

  const selectedIds = field.value || [];
  const selectedMenus = menus.filter((menu) => selectedIds.includes(menu._id));

  const swapPosition = (id1: string, id2: string) => {
    const ids = field.value;

    const index1 = menus.findIndex((menu) => menu._id === id1);
    const index2 = menus.findIndex((menu) => menu._id === id2);

    if (index1 === -1 || index2 === -1) return;

    [ids[index1], ids[index2]] = [ids[index2], ids[index1]];
    field.onChange(ids);
  };

  return (
    <div>
      {/* {selectedMenus.map((menu) => (
        <ChildMenu menu={menu} swapPosition={swapPosition} />
      ))} */}
    </div>
  );
}

export default ChildMenus;
