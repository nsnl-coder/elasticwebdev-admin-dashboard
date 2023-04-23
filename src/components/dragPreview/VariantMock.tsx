import OptionInputs, { TOption } from './OptionMock';
import { AiTwotoneDelete } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

export interface TVariant {
  id: string;
  variantName?: string;
  options: TOption[];
}

interface Props {
  variant: TVariant;
}

function Variant(props: Props): JSX.Element {
  const { variant } = props;

  return (
    <div className="bg-gray-50 py-10 rounded-md px-6 overflow-hidden shadow-2xl border">
      <div className="flex items-center mb-6 gap-x-6 ">
        <div className="h-10 self-end flex items-center cursor-pointer">
          <TbGridDots size={24} />
        </div>
        <div className="flex-grow">
          <label className="block mb-2 text-sm">Variant Name:</label>
          <input className="h-10 w-full px-4 text-lg" />
        </div>
        <div className="flex self-end h-9 items-center">
          <button type="button">
            <AiTwotoneDelete size={22} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        {variant.options.map((option, index) => (
          <OptionInputs key={option.id} option={option} isDragging={false} />
        ))}
      </div>
    </div>
  );
}

export default Variant;
