import {
  object,
  number as originalNumber,
  string,
  boolean,
  InferType,
  array,
} from 'yup';

const number = () => {
  return originalNumber().transform((value, originalValue) => {
    if (typeof originalValue === 'string' && originalValue.trim() === '')
      return undefined;
    return value;
  });
};

const optionSchema = object({
  optionName: string().max(255),
  photo: string().max(255),
  price: number().max(99999),
});

const variantSchema = object({
  variantName: string().max(255),
  options: array().of(optionSchema),
});

const productSchema = object({
  name: string().trim().min(1).max(255).label('Product name'),
  status: string().oneOf(['draft', 'active']).label('Product status'),
  overview: string().max(5000).label('overview'),
  description: string().max(20000).label('description'),
  isPinned: boolean().label('isPinned'),
  price: number().min(0).max(99999).label('price'),
  discountPrice: number()
    .when('price', ([price]: any[], schema: any) =>
      schema.max(price, 'Discount price must be smaller than current price'),
    )
    .label('discountPrice'),
  images: array()
    .max(20)
    .of(string().max(255).required())
    .label('Product images'),
  previewImages: array()
    .max(2)
    .of(string().max(255).required())
    .label('Preview images'),
  collections: array().max(100).label('collections ids'),
  variants: array().of(variantSchema).max(100).label('Product variants'),
});

interface IProduct extends InferType<typeof productSchema> {
  _id?: string;
  slug: string;
}

interface IOption extends InferType<typeof optionSchema> {
  _id?: string;
}

interface IVariant extends InferType<typeof variantSchema> {
  _id?: string;
}

export type { IProduct, IOption, IVariant };
export default productSchema;
