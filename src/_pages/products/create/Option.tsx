import { IProduct } from '@src/yup/productSchema';
import { AiTwotoneDelete } from 'react-icons/ai';
import { HiPlusCircle } from 'react-icons/hi2';
import { TbGridDots } from 'react-icons/tb';
import { Control, UseFormRegister } from 'react-hook-form';
import Input from '@src/components/inputs/Input';
import SelectFromGalleryInput from '@src/components/inputs/SelectFromGalleryInput';
import React from 'react';

interface Props {
  register: UseFormRegister<IProduct>;
  index: number;
  variantIndex: number;
  insert: (index: number, value: object | object[]) => void;
  remove: (index?: number | number[]) => void;
  control: Control<IProduct>;
}

function Option(props: Props): JSX.Element {
  const {
    register,
    index: optionIndex,
    insert,
    remove,
    variantIndex,
    control,
  } = props;

  const getFieldName = (fieldName: string) =>
    `variants.${variantIndex}.options.${optionIndex}.${fieldName}`;

  return (
    <div className="flex gap-x-4 pl-12 group py-2 px-2 bg-gray-50 rounded-sm overflow-hidden">
      <SelectFromGalleryInput
        control={control}
        fieldName={getFieldName('photo')}
      />
      <Input
        register={register}
        control={control}
        fieldName={getFieldName('optionName')}
        labelTheme="light"
        label="Option name:"
        className="h-8 rounded-sm -mt-1"
      />
      <Input
        register={register}
        control={control}
        fieldName={getFieldName('price')}
        labelTheme="light"
        label="Price:"
        className="h-8 rounded-sm -mt-1"
      />
      <div className="flex gap-x-4 items-center self-end h-8 text-zinc-600">
        <button
          type="button"
          className="hover:text-red-400 cursor-pointer"
          onClick={() => remove(optionIndex)}
        >
          <AiTwotoneDelete size={26} />
        </button>
        <button
          type="button"
          className="hover:text-blue-500 cursor-pointer"
          onClick={() => insert(optionIndex + 1, {})}
        >
          <HiPlusCircle size={25} />
        </button>
        <button className="text-zinc-600/40 group-hover:text-zinc-600">
          <TbGridDots size={23} />
        </button>
      </div>
    </div>
  );
}

export default React.memo(Option);
