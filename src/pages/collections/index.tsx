import useGetCollections from '@src/react-query/collections/useGetCollections';
import Pagination from '@src/shared/table/pagination/Pagination';
import Toolbar from '@src/shared/table/toolbar/Toolbar';

const CollectionTable = (): JSX.Element => {
  const { collections, pagination } = useGetCollections();

  return (
    <div className="mx-4 my-8 bg-white">
      <Toolbar />
      <table className="shared-table shadow-xl">
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
      <Pagination
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        totalResults={pagination?.totalResults}
        results={pagination?.results}
      />
    </div>
  );
};

export default CollectionTable;
