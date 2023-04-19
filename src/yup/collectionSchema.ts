import { object, string, boolean, InferType } from 'yup';

const collectionSchema = object({
  name: string().max(255),
  description: string().max(10000).label('description'),
  photo: string().max(255),
  isPinned: boolean().label('Is pinned?'),
  status: string().oneOf(['draft', 'active']).label('Collection status'),
});

interface Collection extends InferType<typeof collectionSchema> {
  _id?: string;
  slug?: string;
}

export default collectionSchema;
export type { Collection };
