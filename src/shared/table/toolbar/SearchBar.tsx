import {
  Dispatch,
  FormEvent,
  InputHTMLAttributes,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';
import { DisplayTool } from './Toolbar';
import { useRouter } from 'next/router';

interface Props {
  searchBy: string;
}

function SearchBar(props: Props): JSX.Element {
  const { searchBy } = props;
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const router = useRouter();
  const keywordRef = useRef<null | HTMLInputElement>(null);

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keywordRef.current?.value.trim()) {
      console.log('ran');

      router.push({
        query: {
          ...router.query,
          searchBy,
          keyword: keywordRef.current.value,
        },
      });
    }
  };

  const handleHideSearch = () => {
    setShowSearch(false);
    const query = router.query;
    const isSearched = query.searchBy && query.keyword;

    delete query.searchBy;
    delete query.keyword;

    if (isSearched) router.push({ query });
  };

  return (
    <form onSubmit={searchHandler} className="flex-grow flex justify-end">
      {showSearch && (
        <div className="flex gap-x-3 flex-grow">
          <input
            type="text"
            className="py-2 px-2 border flex-grow"
            ref={keywordRef}
          />
          <button
            onClick={() => handleHideSearch()}
            type="button"
            className="text-blue-800 font-semibold text-sm hover:underline"
          >
            cancel
          </button>
        </div>
      )}
      {!showSearch && (
        <button
          onClick={() => setShowSearch(true)}
          className="border p-2 bg-gray-50 hover:bg-gray-100 rounded-sm"
        >
          <BsSearch />
        </button>
      )}
    </form>
  );
}

export default SearchBar;
