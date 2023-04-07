import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  pageNum: number | string;
  currentPage: number;
}

function PaginationItem(props: Props): JSX.Element {
  const { pageNum, currentPage } = props;
  const router = useRouter();

  const onClickHandler = () => {
    if (pageNum === '...') return;

    router.push({
      query: {
        ...router.query,
        page: props.pageNum,
      },
    });
  };

  return (
    <button
      onClick={onClickHandler}
      className={`btn ${currentPage === pageNum ? 'btn-active' : ''}`}
    >
      {pageNum}
    </button>
  );
}

export default PaginationItem;
