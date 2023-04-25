import { object, string, InferType, array } from 'yup';

const carouselItem = object({
  photo: string().max(255).label('photo'),
  title: string().max(255).label('Carousel title'),
  description: string().max(500).label('Carousel description'),
  link: string().max(255).default('Carousel link'),
});

const homeSchema = object({
  versionName: string().required().label('version name').required(),
  status: string().oneOf(['active', 'draft']).label('status'),
  carouselItems: array().of(carouselItem).label('Carousel items'),
  featuredProducts: array().of(string()).label('Featured products'),
  featuredCollections: array().of(string()).label('Featured collections'),
  featuredPosts: array().of(string()).label('Featured posts'),
});

interface Home extends InferType<typeof homeSchema> {
  _id: string;
}

export default homeSchema;
export type { Home };
