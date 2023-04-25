import { object, string, InferType, array } from 'yup';

const carouselItem = object({
  photo: string().min(1),
  title: string(),
  description: string(),
});

const homeSchema = object({
  versionName: string().required().label('version name'),
  status: string().oneOf(['active', 'draft']).label('status'),
  carouselItems: array().of(carouselItem).label('Carousel items'),
  featuredProducts: array().of(string()).label('Featured products'),
  featuredCollections: array().of(string()).label('Featured collections'),
  featuredPosts: array().of(string()).label('Featured posts'),
  featuredReviews: array().of(string()).label('Featured reviews'),
});

interface Home extends InferType<typeof homeSchema> {
  _id: string;
}

export default homeSchema;
export type { Home };
