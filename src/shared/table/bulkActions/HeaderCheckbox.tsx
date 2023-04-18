import { ChangeEvent } from 'react';

interface Props {
  updateAllCheckBoxes: (checked: boolean) => void;
  isChecked: boolean;
}

function HeaderCheckbox(props: Props): JSX.Element {
  const { updateAllCheckBoxes, isChecked } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateAllCheckBoxes(e.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        className="checkbox checkbox-sm rounded-md"
        onChange={handleChange}
        checked={isChecked}
      />
    </div>
  );
}

export default HeaderCheckbox;
