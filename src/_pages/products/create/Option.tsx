import { IProduct } from '@src/yup/productSchema';
import { AiTwotoneDelete } from 'react-icons/ai';
import { HiPlusCircle } from 'react-icons/hi2';
import { TbGridDots } from 'react-icons/tb';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import Input from '@src/components/inputs/Input';

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
    <div className="flex gap-x-4 pl-12 group py-4">
      <div className="flex flex-col justify-between flex-grow">
        <label htmlFor="" className="block">
          Option name:
        </label>
        <Input
          register={register}
          control={control}
          fieldName={getFieldName('optionName')}
          labelTheme="light"
          placeholder=""
          label=""
          required={true}
        />
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="" className="block">
          Price:
        </label>
        <input
          min="0"
          max="99999"
          className="border outline-none h-7 px-3 w-36 rounded-sm placeholder:text-sm"
        />
      </div>
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
          onClick={() => insert(optionIndex, {})}
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

export default Option;
