import { subDays } from 'date-fns';
import {
  object,
  number as originalNumber,
  string,
  date,
  boolean,
  InferType,
} from 'yup';

const number = () => {
  return originalNumber().transform((value, originalValue) => {
    if (typeof originalValue === 'string' && originalValue.trim() === '')
      return undefined;
    return value;
  });
};

const couponSchema = object({
  name: string().min(1).max(255),
  couponCode: string().max(255).label('Coupon code').required(),
  status: string().oneOf(['draft', 'active']).label('Coupon status'),
  discountUnit: string().oneOf(['$', '%']).label('discountUnit'),
  discountAmount: number()
    .when('discountUnit', ([discountUnit]: any[], schema: any) =>
      discountUnit === '%'
        ? schema
            .min(0, 'Discount percentage should be greater than 0!')
            .max(100, 'Discount percentage should be less than 100%!')
        : schema
            .min(0, 'Discount amount in dollar should be greater than 0')
            .max(9999, 'Discount amount in dollar should be less than 9999$'),
    )
    .label('discountAmount')
    .required(),
  couponQuantity: number().min(1).max(9999).label('couponQuantity').required(),
  isFreeshipping: boolean(),
  minimumOrder: number().moreThan(0).lessThan(100000),
  maximumOrder: number()
    .lessThan(100000)
    .when('minimumOrder', ([minimumOrder]: any[], schema: any) =>
      minimumOrder > 0
        ? schema
            .moreThan(
              minimumOrder,
              'Maximum order should be greater than minimum order!',
            )
            .required('Maximum order is required when specified minimum order!')
        : schema,
    ),
  startDate: date()
    .min(
      subDays(new Date(), 1),
      'The discount start date can not be in the past!',
    )
    .label('Coupon start date'),
  endDate: date()
    .when('startDate', ([startDate]: any[], schema: any) =>
      startDate
        ? schema
            .min(
              startDate,
              'The end date of coupon should be after the start date!',
            )
            .required('The end date is required when provided start date!')
        : schema,
    )
    .label('Coupon end date'),
});

interface Coupon extends InferType<typeof couponSchema> {
  _id?: string;
  expiredIn?: string;
  usedCoupons?: number;
}

export default couponSchema;
export type { Coupon };
