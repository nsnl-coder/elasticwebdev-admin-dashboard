import { TOption } from './Option';
import OptionInputs from './Option';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { AiTwotoneDelete } from 'react-icons/ai';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import SwapWrapper from '@src/shared/swapWrapper/SwapWrapper';
import { DRAG_TYPES } from '@src/types/enum';

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

  return (
    <SwapWrapper
      itemType={DRAG_TYPES.VARIANT}
      id={variant.id}
      swapPosition={() => console.log('swaping')}
    >
      <div className="flex items-center mb-6 gap-x-6">
        <div className="h-8 self-end flex items-center cursor-pointer">
          <RxDragHandleDots2 size={24} />
        </div>
        <div className="flex-grow">
          <label className="block mb-2">Variant Name:</label>
          <input className="border h-8 w-full px-4" />
        </div>
        <div className="flex self-end h-9 items-center">
          <button
            type="button"
            className="hover:text-danger tooltip tooltip-bottom"
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
