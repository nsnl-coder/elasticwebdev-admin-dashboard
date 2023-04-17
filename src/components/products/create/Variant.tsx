import { TOption } from './Option';
import OptionInputs from './Option';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { AiTwotoneDelete } from 'react-icons/ai';
import { Dispatch, SetStateAction } from 'react';
import SwapWrapper from '@src/shared/swapWrapper/SwapWrapper';
import { DRAG_TYPES } from '@src/types/enum';
import { TbGridDots } from 'react-icons/tb';

export interface TVariant {
  id: string;
  variantName?: string;
  options: TOption[];
}

interface Props {
  variant: TVariant;
  setVariants: Dispatch<SetStateAction<TVariant[]>>;
}

function Variant(props: Props): JSX.Element {
  const { variant, setVariants } = props;

  const handleDeleteVariant = () => {
    setVariants((variants) => variants.filter((v) => v.id !== variant.id));
  };

  const swapPosition = (dragId: string, dropId: string) => {
    setVariants((variants) => {
      const copyVariants = [...variants];

      const dragIndex = copyVariants.findIndex(
        (variant) => variant.id === dragId,
      );
      const dropIndex = copyVariants.findIndex(
        (variant) => variant.id === dropId,
      );

      if (dragIndex === -1 || dropIndex == -1) return variants;

      [copyVariants[dragIndex], copyVariants[dropIndex]] = [
        copyVariants[dropIndex],
        copyVariants[dragIndex],
      ];

      return copyVariants;
    });
  };

  return (
    <SwapWrapper
      itemType={DRAG_TYPES.VARIANT}
      id={variant.id}
      swapPosition={swapPosition}
      className="bg-gray-50 py-10 rounded-md px-6 overflow-hidden"
      isOverClassName="border border-blue-500"
      swapOn="drop"
      payload={variant}
    >
      <div className="flex items-center mb-6 gap-x-6">
        <div className="h-10 self-end flex items-center cursor-pointer">
          <TbGridDots size={24} />
        </div>
        <div className="flex-grow">
          <label className="block mb-2 text-sm">Variant Name:</label>
          <input className="h-10 w-full px-4 text-lg" />
        </div>
        <div className="flex self-end h-9 items-center">
          <button
            type="button"
            className="hover:text-danger"
            onClick={() => handleDeleteVariant()}
            data-tip="remove collection"
          >
            <AiTwotoneDelete size={22} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        {variant.options.map((option, index) => (
          <OptionInputs
            key={option.id}
            option={option}
            setVariants={setVariants}
            variantId={variant.id}
          />
        ))}
      </div>
    </SwapWrapper>
  );
}

export default Variant;
