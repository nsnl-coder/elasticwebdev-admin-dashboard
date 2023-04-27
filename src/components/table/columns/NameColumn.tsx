import { RequestConfig } from '@src/react-query/queryConfig';
import Link from 'next/link';

interface Props {
  requestConfig: RequestConfig;
  _id: string | undefined;
  name: string | undefined;
}

function NameColumn(props: Props): JSX.Element | null {
  const { requestConfig, _id, name } = props;

  if (!_id) return null;

  return (
    <Link
      href={`/${requestConfig.pluralName}/${_id}`}
      onClick={(e) => e.stopPropagation()}
    >
      {name}
    </Link>
  );
}

export default NameColumn;
