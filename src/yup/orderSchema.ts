import { array, InferType, number as originalNumber, object, string } from 'yup';

const number = () => {
  return originalNumber().transform((value, originalValue) => {
    if (typeof originalValue === 'string' && originalValue.trim() === '')
      return undefined;
    return value;
  });
};

const itemSchema = object({
  product: string().required(),
  quantity: number().max(999),
  options: array().of(string()),
});

const orderSchema = object({
  items: array()
    .of(itemSchema)
    .min(1, 'Your order need to have at least one item!')
    .label('Order items'),
  couponCode: string().max(255).label('Discount code'),
  notes: string().max(255).label('Order note'),
  email: string().email().max(150).lowercase().label('email'),
  fullname: string().max(255).label('Full name'),
  phone: string()
    .matches(/^[0-9]{9,16}$/, 'Please provide valid phone number')
    .label('Phone number'),
  shippingAddress: string().max(255).label('Shipping address'),
  shippingMethod: string(),
});

interface IOrder extends InferType<typeof orderSchema> {
  _id?: string;
}

export default orderSchema;
export type { IOrder };
