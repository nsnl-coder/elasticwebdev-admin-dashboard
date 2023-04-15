import { DefinedRange, Range } from 'react-date-range';
import { addDays } from 'date-fns';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface Props {
  range: Range;
  handleRangeChange: (onChange: any, range: Range) => void;
  field: ControllerRenderProps<FieldValues, string>;
}

function DateRangeFromNow(props: Props): JSX.Element {
  const { range, handleRangeChange, field } = props;

  return (
    <div>
      <h3 className="text-sm font-medium text-paragraph text-center h-[52px] flex items-center justify-center bg-[#eff2f7]">
        Duration from now
      </h3>
      <DefinedRange
        onChange={(item) => handleRangeChange(field.onChange, item.selection)}
        ranges={[range]}
        staticRanges={[
          {
            label: '24 hours',
            range: () => ({
              startDate: new Date(),
              endDate: addDays(new Date(), 1),
            }),
            isSelected() {
              return false;
            },
          },
          {
            label: '7 days',
            range: () => ({
              startDate: new Date(),
              endDate: addDays(new Date(), 7),
            }),
            isSelected() {
              return false;
            },
          },
          {
            label: '1 month',
            range: () => ({
              startDate: new Date(),
              endDate: addDays(new Date(), 30),
            }),
            isSelected() {
              return false;
            },
          },
          {
            label: '3 months',
            range: () => ({
              startDate: new Date(),
              endDate: addDays(new Date(), 90),
            }),
            isSelected() {
              return false;
            },
          },
          {
            label: '1 year',
            range: () => ({
              startDate: new Date(),
              endDate: addDays(new Date(), 365),
            }),
            isSelected() {
              return false;
            },
          },
        ]}
      />
    </div>
  );
}

export default DateRangeFromNow;
