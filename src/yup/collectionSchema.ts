import { object, string, boolean } from 'yup';

const collectionSchema = object({
  name: string().max(255),
  description: string().max(10000).label('description'),
  photo: string().max(255),
  isPinned: boolean(),
  status: string().oneOf(['draft', 'active']),
});

export default collectionSchema;
