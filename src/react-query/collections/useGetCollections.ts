import useCallApi from '../useCallApi';
import { useEffect, useState } from 'react';
import Collection from '@src/types/collection';
import Pagination from '@src/types/pagination';
import { useRouter } from 'next/router';

const useGetCollections = () => {
  const router = useRouter();
  const query = router.query;

  const [collections, setCollections] = useState<Collection[] | []>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const applyApiData = (data: any) => {
    setCollections(data.data);
    setPagination(data.pagination);
  };

  const {
    isLoading: isLoadingCollections,
    error: collectionError,
    sendRequest,
  } = useCallApi();

  useEffect(() => {
    if (!router.isReady) return;

    // console.log(query);

    sendRequest(
      {
        method: 'GET',
        url: '/collections',
        params: {
          ...query,
        },
      },
      applyApiData,
    );
  }, [
    query.page,
    query.itemsPerPage,
    query.sort,
    query.status,
    router.isReady,
  ]);

  return { isLoadingCollections, collections, collectionError, pagination };
};

export default useGetCollections;
