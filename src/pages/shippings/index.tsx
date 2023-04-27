import useBulkActions from '@src/hooks/useBulkActions';
import { IShipping } from '@src/yup/shippingSchema';

import useGetOnes from '@react-query/query/useGetOnes';
import queryConfig from '@react-query/queryConfig';

import BulkActions from '@components/table/bulkActions/BulkActions';
import HeaderCheckbox from '@components/table/bulkActions/HeaderCheckbox';
import ActionsColumn from '@components/table/columns/ActionsColumn';
import CheckBoxColumn from '@components/table/columns/CheckBoxColumn';
import NameColumn from '@components/table/columns/NameColumn';
import StatusColumn from '@components/table/columns/StatusColumn';
import TableWrapper from '@components/table/tableWrapper/TableWrapper';
import Thead from '@components/table/thead/Thead';
import Toolbar from '@components/table/toolbar/Toolbar';

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
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={shipping._id}
              />
              <NameColumn
                _id={shipping._id}
                requestConfig={queryConfig.shippings}
                name={shipping.display_name}
              />
              <td>{shipping.fees}</td>
              <StatusColumn
                requestConfig={requestConfig}
                status={shipping.status}
                id={shipping._id}
              />
              <td>
                {shipping.delivery_min &&
                  `${shipping.delivery_min} ${shipping.delivery_min_unit}`}
              </td>
              <td>
                {shipping.delivery_max &&
                  `${shipping.delivery_max} ${shipping.delivery_max_unit}`}
              </td>
              <ActionsColumn requestConfig={requestConfig} id={shipping._id} />
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
