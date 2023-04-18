import { object, string, boolean, InferType } from 'yup';

const collectionSchema = object({
  name: string().max(255),
  description: string().max(10000).label('description'),
  photo: string().max(255),
  isPinned: boolean(),
  status: string().oneOf(['draft', 'active']),
});

interface Collection extends InferType<typeof collectionSchema> {
  _id?: string;
  slug?: string;
}

export default collectionSchema;
export type { Collection };
