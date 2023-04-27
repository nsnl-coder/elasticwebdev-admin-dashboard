import useBulkActions from '@src/hooks/useBulkActions';
import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import FilePreview from '@src/components/filePreview/FilePreview';
import BulkActions from '@src/components/table/bulkActions/BulkActions';
import HeaderCheckbox from '@src/components/table/bulkActions/HeaderCheckbox';
import Toolbar from '@src/components/table/toolbar/Toolbar';
import { ICollection } from '@src/yup/collectionSchema';
import ActionsColumn from '@src/components/table/columns/ActionsColumn';
import StatusColumn from '@src/components/table/columns/StatusColumn';
import IsPinnedColumn from '@src/components/table/columns/IsPinnedColumn';
import Thead from '@src/components/table/thead/Thead';
import NameColumn from '@src/components/table/columns/NameColumn';
import TableWrapper from '@src/components/table/tableWrapper/TableWrapper';
import CheckBoxColumn from '@src/components/table/columns/CheckBoxColumn';

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
