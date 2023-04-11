import Pagination from '@src/types/pagination';
import getPagesArray from '@src/utils/getPagesArray';
import Gotopage from './Gotopage';
import PaginationItem from './PaginationItem';

interface Props {
  pagination: Partial<Pagination> | undefined;
  isLoading: boolean;
}

function Pagination(props: Props): JSX.Element {
  let totalPages = props.pagination?.totalPages;
  let itemsPerPage = props.pagination?.itemsPerPage || 10;
  let currentPage = props.pagination?.currentPage;
  let totalResults = props.pagination?.totalResults;
  let results = props.pagination?.results || 0;

  if (props.isLoading) {
    return <div>Loading....</div>;
  }

  if (!totalPages || !currentPage) {
    return <div>No</div>;
  }

  const pagesArray = getPagesArray(currentPage, totalPages);

  return (
    <div className="pt-8 pb-6 flex justify-between items-center px-3">
      <div>
        <Gotopage currentPage={currentPage} totalPages={totalPages} />
      </div>
      <div className="flex gap-x-2">
        {pagesArray.map((page, index) => (
          <PaginationItem
            key={index}
            pageNum={page}
            currentPage={currentPage}
          />
        ))}
      </div>
      <div>
        <p className="text-gray-500 text-md">
          Results: {itemsPerPage * (currentPage - 1) + 1}-
          {itemsPerPage * (currentPage - 1) + results} of {totalResults}
        </p>
      </div>
    </div>
  );
}

export default Pagination;
