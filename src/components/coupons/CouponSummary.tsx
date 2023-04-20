import getLocaleDateString from '@src/utils/getLocaleDateString';
import { Coupon } from '@src/yup/couponSchema';
import { UseFormGetValues } from 'react-hook-form';

interface Props {
  getValues: UseFormGetValues<Coupon>;
}

function CouponSummary(props: Props): JSX.Element {
  const { getValues } = props;

  return (
    <div>
      <h3 className="font-medium mb-4">Summary</h3>
      <ul className="list-disc px-4 flex gap-y-2 flex-col">
        {getValues('status') && (
          <li>
            <div className="flex gap-x-3 items-center">
              Status:
              {getValues('status') === 'draft' ? (
                <span className="badge">draft</span>
              ) : (
                <span className="badge bg-green-500 border-none text-white">
                  active
                </span>
              )}
            </div>
          </li>
        )}
        {getValues('couponCode') && (
          <li>
            Code: <span className="bg-gray-100">{getValues('couponCode')}</span>
          </li>
        )}
        {getValues('discountAmount') && (
          <li>
            {getValues('discountAmount')}
            {getValues('discountUnit')} off total order
          </li>
        )}
        {getValues('isFreeshipping') && <li>Freeshipping</li>}
        {getValues('endDate') && getValues('startDate') && (
          <li>
            {`Discount start from
              ${getLocaleDateString(getValues('endDate'))} -   
                ${getLocaleDateString(getValues('endDate'))}`}
          </li>
        )}
        {getValues('minimumOrder') && (
          <li>Only valid for order over {getValues('minimumOrder')}$ </li>
        )}
        {getValues('maximumOrder') && (
          <li>Only valid for order under {getValues('maximumOrder')}$</li>
        )}
      </ul>
    </div>
  );
}

export default CouponSummary;
