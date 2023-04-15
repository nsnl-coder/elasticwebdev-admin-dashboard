import { useState } from 'react';
import { Range } from 'react-date-range';
import { DateRange } from 'react-date-range';
import DateRangeFromNow from './date/DateRangeFromNow';
import Label, { LabelProps } from '../form/Label';

interface Props extends LabelProps {
  control: any;
  errors: any;
}

function DateRangeInput(props: Props): JSX.Element {
  const { fieldName, label, required = false, labelTheme, errors } = props;

  const [range, setRange] = useState<Range>({
    startDate: new Date(),
    endDate: undefined,
    key: 'selection',
  });

  return (
    <div>
      <Label
        fieldName={fieldName}
        label={label}
        required={required}
        labelTheme={labelTheme}
      />
      <div className="flex justify-center">
        <DateRangeFromNow range={range} setRange={setRange} />
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setRange(item.selection)}
          moveRangeOnFirstSelection={false}
          ranges={[range]}
          minDate={new Date()}
        />
      </div>
      <p className="text-sm text-red-400 mt-1">{errors[fieldName]?.message}</p>
    </div>
  );
}

export default DateRangeInput;
