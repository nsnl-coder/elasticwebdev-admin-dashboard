import useUpdateOne from '@src/react-query/query/useUpdateOne';
import { RequestConfig } from '@src/react-query/queryConfig';
import { useEffect, useState } from 'react';
import { AiFillPushpin } from 'react-icons/ai';

interface Props {
  isPinned: boolean | undefined;
  requestConfig: RequestConfig;
  id: string | undefined;
}

function IsPinnedColumn(props: Props): JSX.Element {
  let { requestConfig, id } = props;
  const [isPinned, setIsPinned] = useState<boolean | undefined>(props.isPinned);
  const { updateOne } = useUpdateOne(requestConfig);

  const toggleIsPinned = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    updateOne({ isPinned: !isPinned }, id);
    setIsPinned(!isPinned);
  };

  return (
    <div>
      {isPinned && (
        <button
          type="button"
          onClick={toggleIsPinned}
          className="tooltip hover:text-red-400"
          data-tip="unpin"
        >
          <AiFillPushpin size={24} />
        </button>
      )}
    </div>
  );
}

export default IsPinnedColumn;
