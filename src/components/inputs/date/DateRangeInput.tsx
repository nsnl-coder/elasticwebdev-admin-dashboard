import { Range } from 'react-date-range';
import { DateRange } from 'react-date-range';
import DateRangeFromNow from './DateRangeFromNow';
import Label, { LabelProps } from '../../form/Label';
import ErrorMessage from '../../form/ErrorMessage';
import { useController } from 'react-hook-form';
import { addDays } from 'date-fns';

interface Props extends Omit<LabelProps, 'fieldName' | 'label'> {
  control: any;
  errors: any;
  startDateFieldName: string;
  endDateFieldName: string;
  label: string;
}

function DateRangeInput(props: Props): JSX.Element {
  const {
    startDateFieldName,
    endDateFieldName,
    label,
    required = false,
    labelTheme,
    errors,
    control,
  } = props;

  const { field: startDateField } = useController({
    name: startDateFieldName,
    control,
  });
  const { field: endDateField } = useController({
    name: endDateFieldName,
    control,
  });

  const handleRangeChange = (range: Range) => {
    startDateField.onChange(range.startDate);
    endDateField.onChange(range.endDate);
  };

  let range: Range = {
    startDate: new Date(startDateField.value || Date.now()),
    endDate: new Date(endDateField.value || Date.now()),
    key: 'selection',
  };

  return (
    <div>
      <Label
        fieldName=""
        label={label}
        required={required}
        labelTheme={labelTheme}
      />
      <div className="flex justify-center">
        <DateRangeFromNow range={range} handleRangeChange={handleRangeChange} />
        <DateRange
          editableDateInputs={true}
          onChange={(item) => handleRangeChange(item.selection)}
          moveRangeOnFirstSelection={false}
          ranges={[range]}
          minDate={new Date()}
        />
      </div>
      <ErrorMessage errors={errors} fieldName={startDateFieldName} />
      <ErrorMessage errors={errors} fieldName={endDateFieldName} />
    </div>
  );
}

export default DateRangeInput;
