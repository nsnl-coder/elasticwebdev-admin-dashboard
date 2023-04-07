interface Collection {
  _id: string;
  name: string;
  status: string;
  photo?: string;
  isPinned?: boolean;
  slug: string;
}

export default Collection;
