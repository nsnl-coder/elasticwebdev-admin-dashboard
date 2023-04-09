import { Sort } from '@src/types/table';
import { useState } from 'react';
import MultipleSelect from '../customFilter/MultipleSelect';
import SingleSelect from '../customFilter/SingleSelect';
import SearchBar from './SearchBar';
import SortBar from './SortBar';

interface DisplayTool {
  showSearch: boolean;
  showSort: boolean;
  currentFilter: string | undefined;
}

function Toolbar(): JSX.Element {
  const [displayTool, setDisplayTool] = useState<DisplayTool>({
    showSearch: false,
    showSort: false,
    currentFilter: undefined,
  });

  const sort: Sort = [
    ['name', 'a-z', 'z-a'],
    ['created', 'Oldest first', 'Newest first'],
    ['updated', 'Oldest first', 'Newest first'],
  ];

  return (
    <div className="py-3 px-4 border-b flex items-center justify-between gap-12">
      <div className="flex items-center gap-x-3">
        <MultipleSelect
          currentFilter={displayTool.currentFilter}
          queryField="status"
          fieldValues={['draft', 'active']}
          setDisplayTool={setDisplayTool}
        />
        <SingleSelect
          currentFilter={displayTool.currentFilter}
          displayText={'rows per page'}
          queryField="itemsPerPage"
          fieldValues={['5', '10', '20', '50', '100', '500', '1000']}
          setDisplayTool={setDisplayTool}
        />
      </div>

      <div className="flex items-center gap-x-4 flex-grow justify-end">
        <SearchBar
          showSearch={displayTool.showSearch}
          setDisplayTool={setDisplayTool}
        />
        <SortBar
          sort={sort}
          showSort={displayTool.showSort}
          setDisplayTool={setDisplayTool}
        />
      </div>
    </div>
  );
}

export default Toolbar;
export type { DisplayTool };
