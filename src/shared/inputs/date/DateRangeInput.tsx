import { useState } from 'react';
import { Range } from 'react-date-range';
import { DateRange } from 'react-date-range';
import DateRangeFromNow from './DateRangeFromNow';
import Label, { LabelProps } from '../../form/Label';
import ErrorMessage from '../../form/ErrorMessage';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import { addDays } from 'date-fns';

interface Props extends LabelProps {
  control: any;
  errors: any;
}

function DateRangeInput(props: Props): JSX.Element {
  const {
    fieldName,
    label,
    required = false,
    labelTheme,
    errors,
    control,
  } = props;

  const handleRangeChange = (
    onChange: (...event: any[]) => void,
    range: Range,
  ) => {
    onChange({
      startDate: range.startDate,
      endDate: range.endDate,
      key: 'selection',
    });
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }}
      render={({ field }) => (
        <div>
          <Label
            fieldName={fieldName}
            label={label}
            required={required}
            labelTheme={labelTheme}
          />
          <div className="flex justify-center">
            <DateRangeFromNow
              range={field.value}
              handleRangeChange={handleRangeChange}
              field={field}
            />
            <DateRange
              editableDateInputs={true}
              onChange={(item) =>
                handleRangeChange(field.onChange, item.selection)
              }
              moveRangeOnFirstSelection={false}
              ranges={[field.value]}
              minDate={new Date()}
            />
          </div>
          <ErrorMessage errors={errors} fieldName={fieldName} />
        </div>
      )}
    />
  );
}

export default DateRangeInput;
