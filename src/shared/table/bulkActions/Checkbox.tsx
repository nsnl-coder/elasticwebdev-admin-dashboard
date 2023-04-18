import { Checkbox } from '@src/hooks/useBulkActions';
import { ChangeEvent } from 'react';

interface Props {
  id?: string;
  checkedBoxesIds: string[];
  handleCheckBoxChange: (checkbox: Checkbox) => void;
}

function Checkbox(props: Props): JSX.Element {
  const { handleCheckBoxChange, id, checkedBoxesIds } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (id) {
      handleCheckBoxChange({
        id,
        checked: e.target.checked,
      });
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        className="checkbox checkbox-sm rounded-md"
        checked={!!id && checkedBoxesIds.includes(id)}
        onChange={handleChange}
      />
    </div>
  );
}

export default Checkbox;
