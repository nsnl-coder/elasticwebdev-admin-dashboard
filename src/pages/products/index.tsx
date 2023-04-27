import useBulkActions from '@src/hooks/useBulkActions';
import useGetOnes from '@src/react-query/query/useGetOnes';
import BulkActions from '@src/components/table/bulkActions/BulkActions';
import Checkbox from '@src/components/table/bulkActions/Checkbox';
import HeaderCheckbox from '@src/components/table/bulkActions/HeaderCheckbox';
import Toolbar from '@src/components/table/toolbar/Toolbar';
import { IProduct } from '@src/yup/productSchema';
import ActionsColumn from '@src/components/table/columns/ActionsColumn';
import StatusColumn from '@src/components/table/columns/StatusColumn';
import IsPinnedColumn from '@src/components/table/columns/IsPinnedColumn';
import Thead from '@src/components/table/thead/Thead';
import PhotoColumn from '@src/components/table/columns/PhotoColumn';
import NameColumn from '@src/components/table/columns/NameColumn';
import TableWrapper from '@src/components/table/tableWrapper/TableWrapper';
import queryConfig from '@src/react-query/queryConfig';

const ProductTable = (): JSX.Element => {
  const requestConfig = queryConfig.products;

  const {
    data: products,
    pagination,
    isLoading,
  } = useGetOnes<IProduct>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(products);

  console.log(requestConfig);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={{
        singularName: 'product',
        pluralName: 'products',
        url: '/api/products',
      }}
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
            <Thead fieldName="Status" sortBy="status" />
            <Thead fieldName="Slug" sortBy="slug" />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product._id}
              onClick={() => toggleRowSelection(product._id)}
              className={
                !!product._id && checkedBoxesIds.includes(product._id)
                  ? 'selected-row'
                  : ''
              }
            >
              <td>
                <Checkbox
                  checkedBoxesIds={checkedBoxesIds}
                  handleCheckBoxChange={handleCheckBoxChange}
                  id={product._id}
                />
              </td>
              <td>
                <PhotoColumn
                  id={product._id}
                  requestConfig={queryConfig.products}
                  s3Key={
                    product.previewImages?.length
                      ? product.previewImages[0]
                      : ''
                  }
                />
              </td>
              <td className="font-semibold hover:underline">
                <NameColumn
                  _id={product._id}
                  requestConfig={queryConfig.products}
                  name={product.name}
                />
              </td>
              <td>
                <IsPinnedColumn
                  requestConfig={requestConfig}
                  isPinned={product.isPinned}
                  id={product._id}
                />
              </td>
              <td>
                <StatusColumn
                  id={product._id}
                  requestConfig={requestConfig}
                  status={product.status}
                />
              </td>

              <td>
                <p className="truncate max-w-md">{product.slug}</p>
              </td>
              <td>
                <ActionsColumn requestConfig={requestConfig} id={product._id} />
              </td>
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

export default ProductTable;
