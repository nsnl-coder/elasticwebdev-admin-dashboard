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
  const sort: Sort = [
    ['name', 'a-z', 'z-a'],
    ['created', 'Oldest first', 'Newest first'],
    ['updated', 'Oldest first', 'Newest first'],
  ];

  return (
    <div className="py-3 px-4 border-b flex items-center justify-between gap-12">
      <div className="flex items-center gap-x-3">
        <MultipleSelect queryField="status" fieldValues={['draft', 'active']} />
        <SingleSelect
          displayText={'rows per page'}
          queryField="itemsPerPage"
          fieldValues={['5', '10', '20', '50', '100', '200', '500', '1000']}
        />
      </div>

      <div className="flex items-center gap-x-4 flex-grow justify-end">
        <SearchBar searchBy="name" />
        <SortBar sort={sort} />
      </div>
    </div>
  );
}

export default Toolbar;
export type { DisplayTool };
