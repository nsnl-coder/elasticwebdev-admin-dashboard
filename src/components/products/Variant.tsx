import { TOption } from './Option';
import { v4 } from 'uuid';
import OptionInputs from './Option';
import { HiPlusCircle } from 'react-icons/hi2';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { AiTwotoneDelete } from 'react-icons/ai';

export interface TVariant {
  id: string;
  variantName?: string;
  options: TOption[];
}

interface Props {
  updateVariant: (newVariant: TVariant) => void;
  variant: TVariant;
  deleteVariant: (id: string) => void;
}

function Variant(props: Props): JSX.Element {
  const { updateVariant, variant, deleteVariant } = props;

  const handleAddMoreOption = () => {
    const newVariant = {
      ...variant,
      options: [...variant.options, { id: v4() }],
    };
    updateVariant(newVariant);
  };

  const handleRemoveOption = (id: string) => {
    const newVariant = {
      ...variant,
      options: variant.options.filter((option) => option.id !== id),
    };

    updateVariant(newVariant);
  };

  const handleUpdateOption = (updatedOption: TOption) => {
    const updateOptionIndex = variant.options.findIndex(
      (option) => option.id === updatedOption.id,
    );

    if (updateOptionIndex === -1) return;

    const newVariant = { ...variant };
    newVariant.options[updateOptionIndex] = updatedOption;
    updateVariant(newVariant);
  };

  const handleSwapElement = (index1: number, index2: number) => {
    const newVariant = { ...variant };
    const options = newVariant.options;

    [options[index1], options[index2]] = [options[index2], options[index1]];

    updateVariant(newVariant);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="h-8 self-end px-2 flex items-center">
          <RxDragHandleDots2 size={24} />
        </div>
        <div className="flex-grow">
          <label className="block mb-2">Variant Name:</label>
          <input className="border h-8 w-full px-4" />
        </div>
        <div className="flex self-end h-9 items-center gap-x-4 pl-4">
          <button
            type="button"
            className="hover:text-danger tooltip tooltip-bottom"
            onClick={() => deleteVariant(variant.id)}
            data-tip="remove collection"
          >
            <AiTwotoneDelete size={22} />
          </button>
          <button
            type="button"
            className="hover:text-success tooltip tooltip-bottom"
            data-tip="Add option"
            onClick={handleAddMoreOption}
          >
            <HiPlusCircle size={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        {variant.options.map((option, index) => (
          <OptionInputs
            key={option.id}
            option={option}
            index={index}
            lastIndex={variant.options.length - 1}
            handleRemoveOption={handleRemoveOption}
            handleUpdateOption={handleUpdateOption}
            handleSwapElement={handleSwapElement}
          />
        ))}
      </div>
    </div>
  );
}

export default Variant;
