import { boolean, InferType, object, string } from 'yup';

const collectionSchema = object({
  display_name: string().max(255).label('Display name').required(),
  hidden_name: string().max(255).label('Hidden name'),
  description: string().max(10000).label('description'),
  photo: string().max(255),
  isPinned: boolean().label('Is pinned?'),
  status: string().oneOf(['draft', 'active']).label('Collection status'),
});

interface ICollection extends InferType<typeof collectionSchema> {
  _id?: string;
  slug?: string;
  name: string;
}

export default collectionSchema;
export type { ICollection };
