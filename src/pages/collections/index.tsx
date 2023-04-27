import useBulkActions from '@src/hooks/useBulkActions';
import { ICollection } from '@src/yup/collectionSchema';

import useGetOnes from '@react-query/query/useGetOnes';
import queryConfig from '@react-query/queryConfig';

import FilePreview from '@components/filePreview/FilePreview';
import BulkActions from '@components/table/bulkActions/BulkActions';
import HeaderCheckbox from '@components/table/bulkActions/HeaderCheckbox';
import ActionsColumn from '@components/table/columns/ActionsColumn';
import CheckBoxColumn from '@components/table/columns/CheckBoxColumn';
import IsPinnedColumn from '@components/table/columns/IsPinnedColumn';
import NameColumn from '@components/table/columns/NameColumn';
import StatusColumn from '@components/table/columns/StatusColumn';
import TableWrapper from '@components/table/tableWrapper/TableWrapper';
import Thead from '@components/table/thead/Thead';
import Toolbar from '@components/table/toolbar/Toolbar';

const CollectionTable = (): JSX.Element => {
  const requestConfig = queryConfig.collections;
  const {
    data: collections,
    pagination,
    isLoading,
  } = useGetOnes<ICollection>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(collections);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={requestConfig}
    >
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
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={collection._id}
              />
              <td>
                {collection.photo && (
                  <div className="w-12 rounded-md overflow-hidden border ">
                    <FilePreview src={collection.photo} />
                  </div>
                )}
              </td>
              <NameColumn
                _id={collection._id}
                requestConfig={queryConfig.collections}
                name={collection.name}
              />
              <IsPinnedColumn
                requestConfig={requestConfig}
                id={collection._id}
                isPinned={collection.isPinned}
              />
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
              <ActionsColumn
                requestConfig={requestConfig}
                id={collection._id}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {checkedBoxesIds.length > 0 && (
        <BulkActions
          checkedBoxesIds={checkedBoxesIds}
          requestConfig={requestConfig}
        />
      )}
    </TableWrapper>
  );
};

export default CollectionTable;
