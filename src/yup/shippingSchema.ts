import { object, number as originalNumber, string, InferType } from 'yup';

const invalid_time = 'Delivery max unit should have higher time unit.';

const number = () => {
  return originalNumber().transform((value, originalValue) => {
    if (typeof originalValue === 'string' && originalValue.trim() === '')
      return undefined;
    return value;
  });
};
const shippingSchema = object({
  display_name: string().min(1).max(255).label('name'),
  status: string().oneOf(['draft', 'active']).label('status'),
  fees: number().min(0).max(9999).label('Delivery fees'),
  freeshipOrderOver: number()
    .min(0)
    .max(9999999)
    .label('Freeship for order over'),
  delivery_min: number().min(0).max(9999).label('Delivery min duration'),
  delivery_min_unit: string()
    .oneOf(['hour', 'day', 'business_day', 'week', 'month'])
    .label('Delivery min duration unit'),
  delivery_max_unit: string()
    .when(
      ['delivery_min', 'delivery_min_unit'],
      ([delivery_min, delivery_min_unit]: any, schema: any) => {
        if (!delivery_min) return schema;

        if (delivery_min_unit === 'hour') {
          return schema
            .oneOf(
              ['hour', 'day', 'business_day', 'week', 'month'],
              invalid_time,
            )
            .required();
        }

        if (delivery_min_unit === 'day') {
          return schema
            .oneOf(['day', 'business_day', 'week', 'month'], invalid_time)
            .required();
        }

        if (delivery_min_unit === 'business_day') {
          return schema
            .oneOf(['business_day', 'week', 'month'], invalid_time)
            .required();
        }

        if (delivery_min_unit === 'week') {
          return schema.oneOf(['week', 'month'], invalid_time).required();
        }

        if (delivery_min_unit === 'month') {
          return schema.oneOf(['month'], invalid_time).required();
        }
      },
    )
    .label('Delivery max duration unit'),
  delivery_max: number()
    .min(0)
    .max(999)
    .when(
      ['delivery_min_unit', 'delivery_max_unit', 'delivery_min'],
      (
        [delivery_min_unit, delivery_max_unit, delivery_min]: any,
        schema: any,
      ) => {
        if (!delivery_min) return schema;

        if (delivery_max_unit === delivery_min_unit) {
          return schema
            .min(
              delivery_min,
              'Delivery max time should be longer than delivery min time.',
            )
            .required();
        }

        return schema.required();
      },
    )
    .label('delivery max duration'),
});

interface IShipping extends InferType<typeof shippingSchema> {
  _id?: string;
}

export default shippingSchema;
export type { IShipping };
