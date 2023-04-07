import Pagination from '@src/types/pagination';
import getPagesArray from '@src/utils/getPagesArray';
import PaginationItem from './PaginationItem';

function Pagination(props: Partial<Pagination>): JSX.Element {
  const { totalPages, currentPage, totalResults, results } = props;

  if (currentPage === undefined || totalPages === undefined) {
    return <div>Loading....</div>;
  }

  const pagesArray = getPagesArray(currentPage, totalPages, 2);

  return (
    <div className="btn-group">
      {pagesArray.map((page, index) => (
        <PaginationItem key={index} pageNum={page} currentPage={currentPage} />
      ))}
    </div>
  );
}

export default Pagination;
