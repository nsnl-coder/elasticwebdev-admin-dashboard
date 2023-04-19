const queryConfig = {
  collections: {
    singularName: 'collection',
    pluralName: 'collections',
    url: '/api/collections',
  },
  products: {
    singularName: 'product',
    pluralName: 'products',
    url: '/api/products',
  },
};

interface RequestConfig {
  singularName: string;
  pluralName: string;
  url: string;
}

export default queryConfig;
export type { RequestConfig };
