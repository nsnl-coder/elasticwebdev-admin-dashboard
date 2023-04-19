import Link from 'next/link';
//
import useBulkActions from '@src/hooks/useBulkActions';
import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import FilePreview from '@src/shared/filePreview/FilePreview';
import TableWrapper from '@src/shared/table/TableWrapper';
import BulkActions from '@src/shared/table/bulkActions/BulkActions';
import Checkbox from '@src/shared/table/bulkActions/Checkbox';
import HeaderCheckbox from '@src/shared/table/bulkActions/HeaderCheckbox';
import Pagination from '@src/shared/table/pagination/Pagination';
import RowAction from '@src/shared/table/rowAction/RowAction';
import Toolbar from '@src/shared/table/toolbar/Toolbar';
import { Collection } from '@src/yup/collectionSchema';

const CollectionTable = (): JSX.Element => {
  const { data: collections, pagination } = useGetOnes<Collection>(
    queryConfig.collections,
  );

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(collections);

  return (
    <TableWrapper className="pb-32">
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
          <thead>
            <tr>
              <th>
                <HeaderCheckbox
                  updateAllCheckBoxes={updateAllCheckBoxes}
                  isChecked={isCheckedAll}
                />
              </th>
              <th>Photo</th>
              <th>Name</th>
              <th>status</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections?.map((collection) => (
              <tr
                key={collection._id}
                onClick={() => toggleRowSelection(collection._id)}
                className={
                  !!collection._id && checkedBoxesIds.includes(collection._id)
                    ? 'bg-gray-100'
                    : ''
                }
              >
                <td>
                  <Checkbox
                    checkedBoxesIds={checkedBoxesIds}
                    handleCheckBoxChange={handleCheckBoxChange}
                    id={collection._id}
                  />
                </td>
                <td>
                  {collection.photo && (
                    <div className="w-12 rounded-md overflow-hidden border ">
                      <FilePreview src={collection.photo} />
                    </div>
                  )}
                </td>
                <td className="font-semibold hover:underline">
                  <Link
                    href={`/${queryConfig.collections.pluralName}/${collection._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {collection.name}
                  </Link>
                </td>
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
                <td>
                  <RowAction
                    requestConfig={queryConfig.collections}
                    id={collection._id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {checkedBoxesIds.length > 0 && (
          <BulkActions
            checkedBoxesIds={checkedBoxesIds}
            requestConfig={queryConfig.collections}
          />
        )}
        <Pagination pagination={pagination} />
      </div>
    </TableWrapper>
  );
};

export default CollectionTable;
