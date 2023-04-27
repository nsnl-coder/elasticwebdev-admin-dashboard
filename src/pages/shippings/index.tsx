import Link from 'next/link';
//
import useBulkActions from '@src/hooks/useBulkActions';
import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import TableWrapper from '@src/components/table/TableWrapper';
import BulkActions from '@src/components/table/bulkActions/BulkActions';
import Checkbox from '@src/components/table/bulkActions/Checkbox';
import HeaderCheckbox from '@src/components/table/bulkActions/HeaderCheckbox';
import Pagination from '@src/components/table/pagination/Pagination';
import Toolbar from '@src/components/table/toolbar/Toolbar';
import { IShipping } from '@src/yup/shippingSchema';
import EmptyUi from '@src/components/table/emptyui/EmptyUi';
import ActionsColumn from '@src/components/table/columns/ActionsColumn';
import StatusColumn from '@src/components/table/columns/StatusColumn';
import Thead from '@src/components/table/thead/Thead';
import NameColumn from '@src/components/table/columns/NameColumn';

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
    <TableWrapper className="pb-32">
      <div className="flex justify-between py-6">
        <h2 className="font-semibold text-xl">Shippings</h2>
        <Link
          href={'/shippings/create'}
          type="button"
          className="bg-primary text-white px-2 py-2"
        >
          Add shipping
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

export default ShippingTable;
