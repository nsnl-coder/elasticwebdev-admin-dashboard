import { UseFormRegister } from 'react-hook-form';

interface Props {
  value: string;
  register: UseFormRegister<any>;
  name: string;
}

function Checkbox(props: Props): JSX.Element {
  const { name, register, value } = props;

  return (
    <label className="flex items-center gap-x-3">
      <input
        className="checkbox checkbox-sm rounded-md"
        type="checkbox"
        {...register('myCheckbox')}
        value={value}
      />
      <span className="inline-block mt-0.5">{name}</span>
    </label>
  );
}

export default Checkbox;
