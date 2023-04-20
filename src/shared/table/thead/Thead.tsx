import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiSort } from 'react-icons/bi';
import { BsSortAlphaDown, BsSortAlphaUpAlt } from 'react-icons/bs';

interface Props {
  fieldName: string;
  sortBy?: string;
}

function Thead(props: Props): JSX.Element {
  const router = useRouter();
  const query = router.query;

  const { fieldName, sortBy } = props;
  const [sortDirection, setSortDirection] = useState<null | 'asc' | 'desc'>(
    null,
  );

  const handleOnClick = () => {
    setSortDirection((prev) =>
      prev === null ? 'asc' : prev === 'asc' ? 'desc' : null,
    );
  };

  useEffect(() => {
    if (!sortBy) return;

    let sort = query.sort || '';

    if (typeof sort !== 'string') return;

    const sortArr = sort.split(',');
    const newSortArr = sortArr.filter(
      (q) => q !== sortBy && q !== `-${sortBy}`,
    );

    if (sortDirection === 'asc') {
      newSortArr.push(sortBy);
    }
    if (sortDirection === 'desc') {
      newSortArr.push(`-${sortBy}`);
    }

    sort = newSortArr.join(',');
    if (sort.length > 0) {
      router.push({
        query: {
          ...query,
          sort,
        },
      });
    }
  }, [sortDirection]);

  return (
    <th className="group" onClick={handleOnClick}>
      <div className="flex items-center gap-x-3 cursor-pointer">
        {fieldName}
        {sortBy && (
          <span
            className={`${
              sortDirection ? '' : 'opacity-0'
            } group-hover:opacity-100 w-5`}
          >
            {sortDirection === 'asc' && <BsSortAlphaDown size={18} />}
            {sortDirection === 'desc' && <BsSortAlphaUpAlt size={18} />}
            {sortDirection === null && <BiSort className="opacity-50" />}
          </span>
        )}
      </div>
    </th>
  );
}

export default Thead;
