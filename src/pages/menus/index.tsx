import useBulkActions from '@src/hooks/useBulkActions';
import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import FilePreview from '@src/components/filePreview/FilePreview';
import BulkActions from '@src/components/table/bulkActions/BulkActions';
import HeaderCheckbox from '@src/components/table/bulkActions/HeaderCheckbox';
import Toolbar from '@src/components/table/toolbar/Toolbar';
import { IMenu } from '@src/yup/menuSchema';
import ActionsColumn from '@src/components/table/columns/ActionsColumn';
import StatusColumn from '@src/components/table/columns/StatusColumn';
import Thead from '@src/components/table/thead/Thead';
import MultipleSelect from '@src/components/table/customFilter/MultipleSelect';
import NameColumn from '@src/components/table/columns/NameColumn';
import TableWrapper from '@src/components/table/tableWrapper/TableWrapper';
import CheckBoxColumn from '@src/components/table/columns/CheckBoxColumn';

const MenuTable = (): JSX.Element => {
  const requestConfig = queryConfig.menus;
  const {
    data: menus,
    pagination,
    isLoading,
  } = useGetOnes<IMenu>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(menus);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={requestConfig}
    >
      <Toolbar>
        <MultipleSelect
          queryField="position"
          fieldValues={['header', 'footer']}
        />
        <MultipleSelect
          queryField="menuType"
          fieldValues={['root', 'nested']}
        />
      </Toolbar>
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
            <Thead fieldName="menu type" sortBy="menuType" />
            <Thead fieldName="position" sortBy="position" />
            <Thead fieldName="ordering" sortBy="ordering" />
            <Thead fieldName="status" sortBy="status" />
            <th>Link</th>
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
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={menu._id}
              />
              <td>
                {menu.photo && (
                  <div className="w-12 rounded-md overflow-hidden border ">
                    <FilePreview src={menu.photo} />
                  </div>
                )}
              </td>
              <NameColumn
                _id={menu._id}
                requestConfig={queryConfig.menus}
                name={menu.name}
              />
              <td>{menu.menuType}</td>
              <td>{menu.position || '_'}</td>
              <td>{menu.ordering || '_'}</td>
              <StatusColumn
                requestConfig={requestConfig}
                status={menu.status}
                id={menu._id}
              />
              <td>
                <p className="truncate max-w-md">{menu.link}</p>
              </td>
              <ActionsColumn requestConfig={requestConfig} id={menu._id} />
            </tr>
          ))}
        </tbody>
      </table>
      {checkedBoxesIds.length > 0 && (
        <BulkActions
          checkedBoxesIds={checkedBoxesIds}
          requestConfig={requestConfig}
          uiControls={{ showPin: false, showActive: true, showDraft: true }}
        />
      )}
    </TableWrapper>
  );
};

export default MenuTable;
