import { UseFormRegister } from 'react-hook-form';
import Label, { LabelProps, LabelThemes } from '../form/Label';
import Checkbox from './Checkbox';

interface Checkbox {
  name: string;
  value: string;
}

interface Props extends LabelProps {
  register: UseFormRegister<any>;
  errors: any;
  options: string[] | Checkbox[];
}

function CheckBoxes(props: Props): JSX.Element {
  const {
    register,
    errors,
    fieldName,
    labelTheme,
    options,
    label,
    required = true,
  } = props;

  return (
    <div>
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        required={required}
        labelTheme={labelTheme}
      />
      <div className="flex gap-x-8 gap-y-3 flex-wrap">
        {options.map((option) => {
          if (typeof option === 'string') {
            return (
              <Checkbox
                register={register}
                value={option}
                name={option}
                key={option}
              />
            );
          } else {
            return (
              <Checkbox
                register={register}
                value={option.value}
                name={option.name}
                key={option.value}
              />
            );
          }
        })}
      </div>
      <p className="text-sm text-red-400 mt-1">{errors[fieldName]?.message}</p>
    </div>
  );
}

export default CheckBoxes;
