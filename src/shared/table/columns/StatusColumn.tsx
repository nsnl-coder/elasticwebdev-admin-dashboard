import useUpdateOne from '@src/react-query/query/useUpdateOne';
import { RequestConfig } from '@src/react-query/queryConfig';
import { useEffect, useState } from 'react';

interface Props {
  status: string | undefined;
  requestConfig: RequestConfig;
  id: string | undefined;
}

function StatusColumn(props: Props): JSX.Element {
  let { requestConfig, id } = props;
  const [status, setStatus] = useState<string>();

  const isActive = status === 'active';
  const isDraft = status === 'draft';

  const { updateOne } = useUpdateOne(requestConfig);

  const toggleStatus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const newStatus = status === 'active' ? 'draft' : 'active';
    updateOne({ status: newStatus }, id);
    setStatus(newStatus);
  };

  useEffect(() => {
    if (props.status) setStatus(props.status);
  }, [props.status]);

  return (
    <div
      className={`badge text-white border-none ${
        isActive ? 'bg-green-600' : isDraft ? '' : 'bg-transparent'
      }`}
      onClick={toggleStatus}
    >
      {isActive ? 'active' : isDraft ? 'draft' : 'unknown'}
    </div>
  );
}

export default StatusColumn;
