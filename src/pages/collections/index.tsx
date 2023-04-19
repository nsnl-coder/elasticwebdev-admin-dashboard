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
import Toolbar from '@src/shared/table/toolbar/Toolbar';
import { Collection } from '@src/yup/collectionSchema';
import EmptyUi from '@src/shared/table/emptyui/EmptyUi';
import ActionsColumn from '@src/shared/table/columns/ActionsColumn';
import StatusColumn from '@src/shared/table/columns/StatusColumn';
import IsPinnedColumn from '@src/shared/table/columns/IsPinnedColumn';
import Thead from '@src/shared/table/thead/Thead';

const CollectionTable = (): JSX.Element => {
  const requestConfig = queryConfig.collections;
  const {
    data: collections,
    pagination,
    isLoading,
  } = useGetOnes<Collection>(requestConfig);

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
              <Thead fieldName="Name" sortBy="name" />
              <Thead fieldName="Pin?" sortBy="isPinned" />
              <Thead fieldName="status" sortBy="status" />
              <Thead fieldName="slug" sortBy="slug" />
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
                    ? 'selected-row'
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
                    href={`/${requestConfig.pluralName}/${collection._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {collection.name}
                  </Link>
                </td>
                <td>
                  <IsPinnedColumn
                    requestConfig={requestConfig}
                    id={collection._id}
                    isPinned={collection.isPinned}
                  />
                </td>
                <td>
                  <StatusColumn
                    requestConfig={requestConfig}
                    status={collection.status}
                    id={collection._id}
                  />
                </td>
                <td>
                  <p className="truncate max-w-md">{collection.slug}</p>
                </td>
                <td>
                  <ActionsColumn
                    requestConfig={requestConfig}
                    id={collection._id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EmptyUi
          totalPage={pagination?.totalPages}
          isLoading={isLoading}
          requestConfig={requestConfig}
        />
        {checkedBoxesIds.length > 0 && (
          <BulkActions
            checkedBoxesIds={checkedBoxesIds}
            requestConfig={requestConfig}
          />
        )}
        <Pagination pagination={pagination} />
      </div>
    </TableWrapper>
  );
};

export default CollectionTable;
