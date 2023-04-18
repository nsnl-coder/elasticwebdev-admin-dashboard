const queryConfig = {
  collections: {
    singularName: 'collection',
    pluralName: 'collections',
    url: '/api/collections',
  },
};

interface RequestConfig {
  singularName: string;
  pluralName: string;
  url: string;
}

export default queryConfig;
export type { RequestConfig };
