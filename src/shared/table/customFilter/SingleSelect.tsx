import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { FaSortDown } from 'react-icons/fa';
import { DisplayTool } from '../toolbar/Toolbar';
import SingleSelectItem from './SingleSelectItem';

interface Props {
  displayText?: string;
  queryField: string;
  fieldValues: string[];
  currentFilter: string | undefined;
  setDisplayTool: Dispatch<SetStateAction<DisplayTool>>;
}

function SingleSelect(props: Props): JSX.Element {
  const router = useRouter();
  const query = router.query;

  const {
    fieldValues,
    queryField,
    displayText,
    currentFilter,
    setDisplayTool,
  } = props;

  const openFilter = () => {
    setDisplayTool((prev) => {
      let newFilter;
      if (currentFilter === queryField) {
        newFilter = undefined;
      } else {
        newFilter = queryField;
      }

      return {
        ...prev,
        currentFilter: newFilter,
      };
    });
  };

  const clearFilter = () => {
    delete query[queryField];

    router.push({
      query: {
        ...query,
        page: 1,
      },
    });
  };

  return (
    <div
      className={`dropdown dropdown-start text-paragraph ${
        currentFilter === queryField ? 'dropdown-open' : ''
      }`}
    >
      <label
        onClick={openFilter}
        className="border px-4 py-0.5 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-full border-dashed flex items-center gap-x-1"
      >
        <span>{query[queryField] || displayText}</span>
        <span>
          <FaSortDown className="mb-1.5" />
        </span>
      </label>
      <div className="dropdown-content p-4 shadow border bg-base-100 w-52 mt-1.5">
        <ul>
          {fieldValues.map((value) => (
            <SingleSelectItem
              key={value}
              value={value}
              queryField={queryField}
            />
          ))}
        </ul>
        <button
          onClick={clearFilter}
          type="button"
          className="block mx-auto mt-2 hover:underline text-blue-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SingleSelect;
