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
import { Coupon } from '@src/yup/couponSchema';
import EmptyUi from '@src/components/table/emptyui/EmptyUi';
import ActionsColumn from '@src/components/table/columns/ActionsColumn';
import StatusColumn from '@src/components/table/columns/StatusColumn';
import { BsCheck } from 'react-icons/bs';
import Thead from '@src/components/table/thead/Thead';

const CouponTable = (): JSX.Element => {
  const requestConfig = queryConfig.coupons;
  const {
    data: coupons,
    pagination,
    isLoading,
  } = useGetOnes<Coupon>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(coupons);

  return (
    <TableWrapper className="pb-32">
      <div className="flex justify-between py-6">
        <h2 className="font-semibold text-xl">Coupons</h2>
        <Link
          href={'/coupons/create'}
          type="button"
          className="bg-primary text-white px-2 py-2"
        >
          Add coupon
        </Link>
      </div>

      <div className="bg-white shadow-lg ">
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
                <td>
                  <Checkbox
                    checkedBoxesIds={checkedBoxesIds}
                    handleCheckBoxChange={handleCheckBoxChange}
                    id={coupon._id}
                  />
                </td>
                <td className="font-semibold hover:underline">
                  <Link
                    href={`/${requestConfig.pluralName}/${coupon._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {coupon.name}
                  </Link>
                </td>
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
                <td>
                  <StatusColumn
                    requestConfig={requestConfig}
                    status={coupon.status}
                    id={coupon._id}
                  />
                </td>
                <td>
                  {coupon.startDate &&
                    new Date(coupon.startDate).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                      day: 'numeric',
                    })}
                </td>
                <td>{coupon.expiredIn}</td>
                <td>
                  <ActionsColumn
                    requestConfig={requestConfig}
                    id={coupon._id}
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

export default CouponTable;
