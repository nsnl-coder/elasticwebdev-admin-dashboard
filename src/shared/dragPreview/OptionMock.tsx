import getS3FileUrl from '@src/utils/getFileUrl';
import { Option } from '@src/yup/productSchema';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { HiPlusCircle } from 'react-icons/hi2';
import { IoMdRemoveCircle } from 'react-icons/io';
import { TbGridDots } from 'react-icons/tb';

export interface TOption extends Option {
  id: string;
  variantId: string;
}

interface Props {
  option: TOption;
  isDragging: boolean;
}

function OptionInputs(props: Props): JSX.Element {
  const { option, isDragging = true } = props;

  return (
    <div
      className={`flex gap-x-4 pl-12 group py-4 px-2 ${
        isDragging ? 'bg-gray-50 border shadow-xl ' : ''
      }`}
    >
      {!option.photo && (
        <div className="flex items-center justify-center bg-gray-100 cursor-pointer w-16 aspect-square">
          <BiImageAdd fontSize={36} />
        </div>
      )}
      {option.photo && (
        <div className="relative bg-gray-100 w-16 aspect-square">
          <img
            className="object-contain w-full h-full"
            src={getS3FileUrl(option.photo)}
          />
          <span className="absolute -top-2 -right-2">
            <IoMdRemoveCircle size={24} />
          </span>
        </div>
      )}
      <div className="flex flex-col justify-between flex-grow">
        <label htmlFor="" className="block">
          Option name:
        </label>
        <input
          className="border outline-none h-7 px-3 w-full rounded-sm placeholder:text-sm"
          name="optionName"
          value={option.optionName || ''}
        />
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="" className="block">
          Price:
        </label>
        <input
          type="number"
          name="price"
          value={option.price || ''}
          className="border outline-none h-7 px-3 w-36 rounded-sm placeholder:text-sm"
        />
      </div>
      <div className="flex gap-x-4 items-center self-end h-8 text-zinc-600">
        <button type="button">
          <AiTwotoneDelete size={26} />
        </button>
        <button type="button">
          <HiPlusCircle size={25} />
        </button>
        <button>
          <TbGridDots size={23} />
        </button>
      </div>
    </div>
  );
}

export default OptionInputs;
