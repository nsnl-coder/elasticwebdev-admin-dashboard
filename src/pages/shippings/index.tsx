import useBulkActions from '@src/hooks/useBulkActions';
import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import BulkActions from '@src/components/table/bulkActions/BulkActions';
import Checkbox from '@src/components/table/bulkActions/Checkbox';
import HeaderCheckbox from '@src/components/table/bulkActions/HeaderCheckbox';
import Toolbar from '@src/components/table/toolbar/Toolbar';
import { IShipping } from '@src/yup/shippingSchema';
import ActionsColumn from '@src/components/table/columns/ActionsColumn';
import StatusColumn from '@src/components/table/columns/StatusColumn';
import Thead from '@src/components/table/thead/Thead';
import NameColumn from '@src/components/table/columns/NameColumn';
import TableWrapper from '@src/components/table/tableWrapper/TableWrapper';

const ShippingTable = (): JSX.Element => {
  const requestConfig = queryConfig.shippings;
  const {
    data: shippings,
    pagination,
    isLoading,
  } = useGetOnes<IShipping>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(shippings);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={requestConfig}
    >
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
            <Thead fieldName="Name" sortBy="name" />
            <Thead fieldName="Fees" sortBy="fees" />
            <Thead fieldName="Status" sortBy="status" />
            <th>Delivery min</th>
            <th>Delivery max</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shippings?.map((shipping) => (
            <tr
              key={shipping._id}
              onClick={() => toggleRowSelection(shipping._id)}
              className={
                !!shipping._id && checkedBoxesIds.includes(shipping._id)
                  ? 'selected-row'
                  : ''
              }
            >
              <td>
                <Checkbox
                  checkedBoxesIds={checkedBoxesIds}
                  handleCheckBoxChange={handleCheckBoxChange}
                  id={shipping._id}
                />
              </td>
              <td className="font-semibold hover:underline">
                <NameColumn
                  _id={shipping._id}
                  requestConfig={queryConfig.shippings}
                  name={shipping.display_name}
                />
              </td>
              <td>{shipping.fees}</td>
              <td>
                <StatusColumn
                  requestConfig={requestConfig}
                  status={shipping.status}
                  id={shipping._id}
                />
              </td>
              <td>
                {shipping.delivery_min &&
                  `${shipping.delivery_min} ${shipping.delivery_min_unit}`}
              </td>
              <td>
                {shipping.delivery_max &&
                  `${shipping.delivery_max} ${shipping.delivery_max_unit}`}
              </td>
              <td>
                <ActionsColumn
                  requestConfig={requestConfig}
                  id={shipping._id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {checkedBoxesIds.length > 0 && (
        <BulkActions
          checkedBoxesIds={checkedBoxesIds}
          requestConfig={requestConfig}
        />
      )}
    </TableWrapper>
  );
};

export default ShippingTable;
