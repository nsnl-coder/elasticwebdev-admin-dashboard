interface QueryConfig {
  singularName: string;
  pluralName: string;
  url: string;
}

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
  coupons: {
    singularName: 'coupon',
    pluralName: 'coupons',
    url: '/api/coupons',
  },
  shippings: {
    singularName: 'shipping',
    pluralName: 'shippings',
    url: '/api/shippings',
  },
  menus: {
    singularName: 'menu',
    pluralName: 'menus',
    url: '/api/menus',
  },
};

interface RequestConfig {
  singularName: string;
  pluralName: string;
  url: string;
}

export default queryConfig;
export type { RequestConfig };
