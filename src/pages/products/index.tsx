import Link from 'next/link';
//
import useBulkActions from '@src/hooks/useBulkActions';
import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import FilePreview from '@src/components/filePreview/FilePreview';
import TableWrapper from '@src/components/table/TableWrapper';
import BulkActions from '@src/components/table/bulkActions/BulkActions';
import Checkbox from '@src/components/table/bulkActions/Checkbox';
import HeaderCheckbox from '@src/components/table/bulkActions/HeaderCheckbox';
import Pagination from '@src/components/table/pagination/Pagination';
import Toolbar from '@src/components/table/toolbar/Toolbar';
import { IProduct } from '@src/yup/productSchema';
import EmptyUi from '@src/components/table/emptyui/EmptyUi';
import ActionsColumn from '@src/components/table/columns/ActionsColumn';
import StatusColumn from '@src/components/table/columns/StatusColumn';
import IsPinnedColumn from '@src/components/table/columns/IsPinnedColumn';
import Thead from '@src/components/table/thead/Thead';

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

  return (
    <TableWrapper className="pb-32">
      <div className="flex justify-between py-6">
        <h2 className="font-semibold text-xl">Products</h2>
        <Link
          href={'/products/create'}
          type="button"
          className="bg-primary text-white px-2 py-2"
        >
          Add product
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
                  {!!product.previewImages?.length && (
                    <div className="w-12 rounded-md overflow-hidden border ">
                      <FilePreview src={product.previewImages[0]} />
                    </div>
                  )}
                </td>
                <td className="font-semibold hover:underline">
                  <Link
                    href={`/${requestConfig.pluralName}/${product._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.name}
                  </Link>
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
                  <ActionsColumn
                    requestConfig={requestConfig}
                    id={product._id}
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

export default ProductTable;
