import useGetCollections from '@src/react-query/collections/useGetCollections';
import ContentWrapper from '@src/shared/hoc/ContentWrapper';
import Pagination from '@src/shared/table/pagination/Pagination';
import Toolbar from '@src/shared/table/toolbar/Toolbar';
import Link from 'next/link';

const CollectionTable = (): JSX.Element => {
  const { collections, pagination } = useGetCollections();

  return (
    <ContentWrapper className="pb-8">
      <div className="flex justify-between py-6">
        <h2 className="font-semibold text-xl">Collections</h2>
        <Link
          href={'/collections/create'}
          type="button"
          className="bg-primary text-white px-2 py-2"
        >
          Add collection
        </Link>
      </div>

      <div className="bg-white shadow-lg ">
        <Toolbar />
        <table className="shared-table">
          <thead className="bg-gray-50">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>status</th>
              <th>Slug</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection._id}>
                <td>
                  <div className="w-16 border">
                    <img src={collection.photo} />
                  </div>
                </td>
                <td>{collection.name}</td>
                <td>
                  <span
                    className={`badge text-white border-none ${
                      collection.status === 'active' ? 'bg-green-600' : ''
                    }`}
                  >
                    {collection.status}
                  </span>
                </td>
                <td>
                  <p className="truncate max-w-md">{collection.slug}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pagination={pagination} />
      </div>
    </ContentWrapper>
  );
};

export default CollectionTable;
