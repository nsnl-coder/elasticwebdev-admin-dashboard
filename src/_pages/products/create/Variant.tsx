import { TOption } from './OptionsInput';
import OptionInputs from './OptionsInput';
import { AiTwotoneDelete } from 'react-icons/ai';
import SwapWrapper from '@src/components/swapWrapper/SwapWrapper';
import { DRAG_TYPES } from '@src/types/enum';
import { TbGridDots } from 'react-icons/tb';
import { ChangeEvent, useCallback } from 'react';

export interface TVariant {
  _id: string;
  variantName?: string;
  options: TOption[];
}

interface Props {
  variant: TVariant;
  setVariants: (fn: (variansts: TVariant[]) => TVariant[]) => void;
}

function Variant(props: Props): JSX.Element {
  const { variant, setVariants } = props;

  const handleDeleteVariant = () => {
    setVariants((variants) => variants.filter((v) => v._id !== variant._id));
  };

  const onVariantNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVariants((variants) => {
      const index = variants.findIndex((v) => v._id === variant._id);
      const newVariant = { ...variant, variantName: e.target.value };

      return [
        ...variants.slice(0, index),
        newVariant,
        ...variants.slice(index + 1),
      ];
    });
  };

  const swapPosition = useCallback(
    (dragId: string, dropId: string) => {
      setVariants((variants) => {
        const copyVariants = [...variants];
        const dragIndex = copyVariants.findIndex(
          (variant) => variant._id === dragId,
        );
        const dropIndex = copyVariants.findIndex(
          (variant) => variant._id === dropId,
        );
        if (dragIndex === -1 || dropIndex == -1) return variants;
        [copyVariants[dragIndex], copyVariants[dropIndex]] = [
          copyVariants[dropIndex],
          copyVariants[dragIndex],
        ];
        return copyVariants;
      });
    },
    [setVariants],
  );

  return (
    <SwapWrapper
      itemType={DRAG_TYPES.VARIANT}
      id={variant._id}
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
          <input
            className="h-10 w-full px-4 text-lg"
            onChange={onVariantNameChange}
            value={variant.variantName}
          />
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
            key={option._id}
            option={option}
            setVariants={setVariants}
            variantId={variant._id}
          />
        ))}
      </div>
    </SwapWrapper>
  );
}

export default Variant;
