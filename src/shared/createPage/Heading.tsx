import useDeleteOne from '@src/react-query/query/useDeleteOne';
import { RequestConfig } from '@src/react-query/queryConfig';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { IoMdTrash } from 'react-icons/io';

interface Props {
  title: string;
  requestConfig: RequestConfig;
  id: string | undefined;
}

function Heading(props: Props): JSX.Element {
  const { title, requestConfig, id } = props;
  const { deleteOne } = useDeleteOne(requestConfig);

  const handleDeleteOne = () => {
    deleteOne(id);
  };

  return (
    <div className="flex gap-x-5 my-4">
      <div className="flex-grow flex items-center gap-x-4">
        <Link
          href={`/${requestConfig.pluralName}`}
          type="button"
          className="border p-2 hover:text-zinc-700 rounded-md"
        >
          <BiArrowBack size={28} />
        </Link>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="max-w-xs w-full flex items-center justify-end">
        <button
          type="button"
          className="tooltip tooltip-bottom hover:text-red-400 ml-2"
          data-tip="delete"
          onClick={handleDeleteOne}
        >
          <IoMdTrash size={31} />
        </button>
      </div>
    </div>
  );
}

export default Heading;
