import Link from 'next/link';
//
import useBulkActions from '@src/hooks/useBulkActions';
import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import FilePreview from '@src/shared/filePreview/FilePreview';
import TableWrapper from '@src/shared/table/TableWrapper';
import BulkActions from '@src/shared/table/bulkActions/BulkActions';
import Checkbox from '@src/shared/table/bulkActions/Checkbox';
import HeaderCheckbox from '@src/shared/table/bulkActions/HeaderCheckbox';
import Pagination from '@src/shared/table/pagination/Pagination';
import Toolbar from '@src/shared/table/toolbar/Toolbar';
import { Menu } from '@src/yup/menuSchema';
import EmptyUi from '@src/shared/table/emptyui/EmptyUi';
import ActionsColumn from '@src/shared/table/columns/ActionsColumn';
import StatusColumn from '@src/shared/table/columns/StatusColumn';
import IsPinnedColumn from '@src/shared/table/columns/IsPinnedColumn';
import Thead from '@src/shared/table/thead/Thead';

const MenuTable = (): JSX.Element => {
  const requestConfig = queryConfig.menus;
  const {
    data: menus,
    pagination,
    isLoading,
  } = useGetOnes<Menu>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(menus);

  return (
    <TableWrapper className="pb-32">
      <div className="flex justify-between py-6">
        <h2 className="font-semibold text-xl">Menus</h2>
        <Link
          href={'/menus/create'}
          type="button"
          className="bg-primary text-white px-2 py-2"
        >
          Add menu
        </Link>
      </div>

      <div className="bg-white shadow-lg ">
        <Toolbar />
        <table className="shared-table">
          <thead>
            <tr>
              <th>
                <HeaderCheckbox
                  updateAllCheckBoxes={updateAllCheckBoxes}
                  isChecked={isCheckedAll}
                />
              </th>
              <th>Photo</th>
              <Thead fieldName="name" sortBy="name" />
              <Thead fieldName="status" sortBy="status" />
              <th>Link</th>
              <Thead fieldName="ordering" sortBy="ordering" />
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus?.map((menu) => (
              <tr
                key={menu._id}
                onClick={() => toggleRowSelection(menu._id)}
                className={
                  !!menu._id && checkedBoxesIds.includes(menu._id)
                    ? 'selected-row'
                    : ''
                }
              >
                <td>
                  <Checkbox
                    checkedBoxesIds={checkedBoxesIds}
                    handleCheckBoxChange={handleCheckBoxChange}
                    id={menu._id}
                  />
                </td>
                <td>
                  {menu.photo && (
                    <div className="w-12 rounded-md overflow-hidden border ">
                      <FilePreview src={menu.photo} />
                    </div>
                  )}
                </td>
                <td className="font-semibold hover:underline">
                  <Link
                    href={`/${requestConfig.pluralName}/${menu._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {menu.name}
                  </Link>
                </td>
                <td>
                  <StatusColumn
                    requestConfig={requestConfig}
                    status={menu.status}
                    id={menu._id}
                  />
                </td>
                <td>
                  <p className="truncate max-w-md">{menu.link}</p>
                </td>
                <td>{menu.ordering}</td>
                <td>
                  <ActionsColumn requestConfig={requestConfig} id={menu._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EmptyUi
          totalPage={pagination?.totalPages}
          isLoading={isLoading}
          requestConfig={requestConfig}
        />
        {checkedBoxesIds.length > 0 && (
          <BulkActions
            checkedBoxesIds={checkedBoxesIds}
            requestConfig={requestConfig}
          />
        )}
        <Pagination pagination={pagination} />
      </div>
    </TableWrapper>
  );
};

export default MenuTable;