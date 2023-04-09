import { Dispatch, InputHTMLAttributes, SetStateAction, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { DisplayTool } from './Toolbar';

interface Props {
  showSearch: boolean;
  setDisplayTool: Dispatch<SetStateAction<DisplayTool>>;
  searchBy: string;
}

function SearchBar(props: Props): JSX.Element {
  const { showSearch, setDisplayTool } = props;
  const keywordInputRef = useRef<HTMLInputElement>(null);

  const hideSearchBar = () => {
    setDisplayTool((prev) => ({ ...prev, showSearch: false }));
  };

  const showSearchBar = () => {
    setDisplayTool((prev) => ({ ...prev, showSearch: true }));
  };

  const searchHandler = () => {};

  return (
    <form onSubmit={searchHandler} className="flex-grow flex justify-end">
      {showSearch && (
        <div className="flex gap-x-3 flex-grow">
          <input
            type="text"
            className="py-2 px-2 border flex-grow"
            ref={keywordInputRef}
          />
          <button
            onClick={hideSearchBar}
            type="button"
            className="text-blue-800 font-semibold text-sm hover:underline"
          >
            cancel
          </button>
        </div>
      )}
      {!showSearch && (
        <button
          onClick={showSearchBar}
          className="border p-2 bg-gray-50 hover:bg-gray-100 rounded-sm"
        >
          <BsSearch />
        </button>
      )}
    </form>
  );
}

export default SearchBar;
