import useBulkActions from '@src/hooks/useBulkActions';
import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import BulkActions from '@src/components/table/bulkActions/BulkActions';
import HeaderCheckbox from '@src/components/table/bulkActions/HeaderCheckbox';
import Toolbar from '@src/components/table/toolbar/Toolbar';
import { ICoupon } from '@src/yup/couponSchema';
import ActionsColumn from '@src/components/table/columns/ActionsColumn';
import StatusColumn from '@src/components/table/columns/StatusColumn';
import { BsCheck } from 'react-icons/bs';
import Thead from '@src/components/table/thead/Thead';
import NameColumn from '@src/components/table/columns/NameColumn';
import TableWrapper from '@src/components/table/tableWrapper/TableWrapper';
import CheckBoxColumn from '@src/components/table/columns/CheckBoxColumn';

const CouponTable = (): JSX.Element => {
  const requestConfig = queryConfig.coupons;
  const {
    data: coupons,
    pagination,
    isLoading,
  } = useGetOnes<ICoupon>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(coupons);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={requestConfig}
    >
      <Toolbar
        searchBy="couponCode,name"
        sortOptions={[
          ['couponQuantity', 'lowest first', 'highest first'],
          ['usedCoupons', 'lowest first', 'highest first'],
          ['name', 'a-z', 'z-a'],
          ['startDate', 'earliest first', 'latest first'],
          ['endDate', 'earliest first', 'latest first'],
        ]}
      />
      <table className="shared-table">
        <thead>
          <tr>
            <th>
              <HeaderCheckbox
                updateAllCheckBoxes={updateAllCheckBoxes}
                isChecked={isCheckedAll}
              />
            </th>
            <Thead fieldName="name" sortBy="name" />
            <Thead fieldName="code" sortBy="couponCode" />
            <Thead fieldName="Freeship?" sortBy="isFreeshipping" />
            <Thead fieldName="coupon quantity" sortBy="couponQuantity" />
            <Thead fieldName="used coupons" sortBy="usedCoupons" />
            <Thead fieldName="status" sortBy="status" />
            <Thead fieldName="start date" sortBy="startDate" />
            <Thead fieldName="expired in" sortBy="endDate" />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons?.map((coupon) => (
            <tr
              key={coupon._id}
              onClick={() => toggleRowSelection(coupon._id)}
              className={
                !!coupon._id && checkedBoxesIds.includes(coupon._id)
                  ? 'selected-row'
                  : ''
              }
            >
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={coupon._id}
              />

              <NameColumn
                _id={coupon._id}
                requestConfig={queryConfig.coupons}
                name={coupon.name}
              />
              <td>
                <span className="uppercase">{coupon.couponCode}</span>
              </td>
              <td>
                {coupon.isFreeshipping ? (
                  <BsCheck className="text-green-600" size={36} />
                ) : (
                  ''
                )}
              </td>
              <td>{coupon.couponQuantity}</td>
              <td>{coupon.usedCoupons}</td>
              <StatusColumn
                requestConfig={requestConfig}
                status={coupon.status}
                id={coupon._id}
              />
              <td>
                {coupon.startDate &&
                  new Date(coupon.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                    day: 'numeric',
                  })}
              </td>
              <td>{coupon.expiredIn}</td>
              <ActionsColumn requestConfig={requestConfig} id={coupon._id} />
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

export default CouponTable;
