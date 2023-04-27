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
    <td className="max-w-xs font-semibold hover:underline">
      <Link
        href={`/${requestConfig.pluralName}/${_id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>{name}</div>
      </Link>
    </td>
  );
}

export default NameColumn;
