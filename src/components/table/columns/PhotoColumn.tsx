import FilePreview from '@src/components/filePreview/FilePreview';
import { RequestConfig } from '@src/react-query/queryConfig';
import Link from 'next/link';

interface Props {
  id: string | undefined;
  s3Key: string | undefined;
  requestConfig: RequestConfig;
}

function PhotoColumn(props: Props): JSX.Element | null {
  const { id, s3Key, requestConfig } = props;

  if (!s3Key || !id) return null;

  const href = `${requestConfig.pluralName}/${id}`;

  return (
    <Link href={href} onClick={(e) => e.stopPropagation()}>
      <div className="w-12 rounded-md overflow-hidden border ">
        <FilePreview src={s3Key} />
      </div>
    </Link>
  );
}

export default PhotoColumn;
