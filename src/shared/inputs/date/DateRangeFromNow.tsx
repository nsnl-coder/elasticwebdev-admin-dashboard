import { DefinedRange, Range } from 'react-date-range';
import { addDays } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  range: Range;
  setRange: Dispatch<SetStateAction<Range>>;
}

function DateRangeFromNow(props: Props): JSX.Element {
  const { range, setRange } = props;

  return (
    <div>
      <h3 className="text-sm font-medium text-paragraph text-center h-[52px] flex items-center justify-center bg-[#eff2f7]">
        Duration from now
      </h3>
      <DefinedRange
        onChange={(item) => setRange(item.selection)}
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
