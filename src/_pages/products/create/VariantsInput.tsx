import Variant from './Variant';
import Label, { LabelProps } from '@src/components/form/Label';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';
import { MdPlaylistAdd } from 'react-icons/md';
import { DRAG_TYPES } from '@src/types/enum';
import SwapWrapper from '@src/components/swapWrapper/SwapWrapper';
import { IProduct } from '@src/yup/productSchema';

interface Props extends LabelProps {
  control: Control<IProduct>;
  register: UseFormRegister<IProduct>;
}

function VariantsInput(props: Props): JSX.Element {
  const { control, register, fieldName, labelTheme, label } = props;
  const {
    fields: variants,
    append,
    remove,
    swap,
  } = useFieldArray({
    control,
    name: 'variants',
  });

  return (
    <div>
      <Label fieldName={fieldName} labelTheme={labelTheme} label={label} />
      <div className="flex flex-col gap-y-12">
        {variants.map((variant, index) => (
          <SwapWrapper
            itemType={DRAG_TYPES.VARIANT}
            swapPosition={swap}
            className="bg-gray-50 py-10 rounded-md px-6 overflow-hidden"
            isOverClassName="border border-blue-500"
            swapOn="drop"
            payload={variant}
            key={variant.id}
            index={index}
          >
            <Variant
              index={index}
              register={register}
              remove={remove}
              control={control}
            />
          </SwapWrapper>
        ))}
        <button
          type="button"
          onClick={() => append({ options: [{}] })}
          className="duration-150 border py-2 font-medium hover:font-semibold flex gap-x-3 justify-center hover:bg-gray-50 group text-green-700"
        >
          <span>Add new variant</span>
          <span className="text-2xl">
            <MdPlaylistAdd />
          </span>
        </button>
      </div>
    </div>
  );
}

export default VariantsInput;
