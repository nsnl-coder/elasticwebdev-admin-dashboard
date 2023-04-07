import { Dispatch, SetStateAction, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { DisplayTool } from './Toolbar';

interface Props {
  showSearch: boolean;
  setDisplayTool: Dispatch<SetStateAction<DisplayTool>>;
}

function SearchBar(props: Props): JSX.Element {
  const { showSearch, setDisplayTool } = props;

  const hideSearchBar = () => {
    setDisplayTool((prev) => ({ ...prev, showSearch: false }));
  };

  const showSearchBar = () => {
    setDisplayTool((prev) => ({ ...prev, showSearch: true }));
  };

  return (
    <div>
      {showSearch && (
        <div className="flex gap-x-3 ">
          <input type="text" className="input-sm w-full border" />
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
    </div>
  );
}

export default SearchBar;
