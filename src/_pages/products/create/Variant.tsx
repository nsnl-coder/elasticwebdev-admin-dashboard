import { Control, UseFormRegister, useFieldArray } from 'react-hook-form';
import Option from './Option';
import { AiTwotoneDelete } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { IProduct } from '@src/yup/productSchema';
import SwapWrapper from '@src/components/swapWrapper/SwapWrapper';
import { DRAG_TYPES } from '@src/types/enum';

interface Props {
  register: UseFormRegister<IProduct>;
  index: number;
  remove: (index?: number | number[]) => void;
  control: Control<IProduct>;
}

function Variant(props: Props): JSX.Element {
  const {
    register,
    index: variantIndex,
    remove: removeVariant,
    control,
  } = props;

  const {
    fields: options,
    remove: removeOption,
    insert,
    swap,
  } = useFieldArray({ control, name: `variants.${variantIndex}.options` });

  return (
    <div>
      <div className="flex items-center mb-6 gap-x-6">
        <div className="h-10 self-end flex items-center cursor-pointer">
          <TbGridDots size={24} />
        </div>
        <div className="flex-grow">
          <label className="block mb-2 text-sm">Variant Name:</label>
          <input
            className="h-10 w-full px-4 text-lg"
            {...register(`variants.${variantIndex}.variantName`)}
          />
        </div>
        <div className="flex self-end h-9 items-center">
          <button
            type="button"
            className="hover:text-danger"
            onClick={() => removeVariant(variantIndex)}
            data-tip="remove collection"
          >
            <AiTwotoneDelete size={22} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        {options.map((option, index) => (
          <SwapWrapper
            swapPosition={swap}
            index={index}
            itemType={DRAG_TYPES.OPTION}
            swapOn="hover"
            payload={option}
            key={option.id}
          >
            <Option
              register={register}
              index={index}
              variantIndex={variantIndex}
              insert={insert}
              remove={removeOption}
            />
          </SwapWrapper>
        ))}
      </div>
    </div>
  );
}

export default Variant;
