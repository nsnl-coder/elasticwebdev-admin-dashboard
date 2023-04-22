import {
  object,
  number as originalNumber,
  string,
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

const menuSchema = object({
  name: string().max(255).label('name').required(),
  status: string().oneOf(['draft', 'active']).label('status'),
  link: string().max(255).label('link'),
  photo: string().max(255).label('photo'),
  type: string().oneOf(['root', 'nested']),
  childMenus: array().of(string()).label('Child menus'),
  position: string().oneOf(['footer', 'header']),
});

interface Menu extends InferType<typeof menuSchema> {
  _id?: string;
}

export default menuSchema;
export type { Menu };
