import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  pageNum: number | string;
  currentPage: number | undefined;
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
      className={`text-paragraph w-9 text-sm aspect-square rounded-full hover:bg-primary hover:text-white ${
        currentPage === pageNum ? 'bg-primary text-white' : ''
      }`}
    >
      {pageNum}
    </button>
  );
}

export default PaginationItem;
