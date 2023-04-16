import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import getS3FileUrl from '@src/utils/getFileUrl';
import { Option } from '@src/yup/productSchema';
import { ChangeEvent } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import { IoMdRemoveCircle } from 'react-icons/io';

export interface TOption extends Option {
  id: string;
}

interface Props {
  option: TOption;
  index: number;
  lastIndex: number;
  handleRemoveOption: (id: string) => void;
  handleUpdateOption: (option: TOption) => void;
  handleSwapElement: (index1: number, index2: number) => void;
}

function OptionInputs(props: Props): JSX.Element {
  const {
    handleRemoveOption,
    option,
    handleUpdateOption,
    index,
    lastIndex,
    handleSwapElement,
  } = props;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    let value = e.target.value;

    if (fieldName === 'price' && isNaN(Number(value))) {
      value = '';
    }

    const newOption = { ...option, [fieldName]: value };
    handleUpdateOption(newOption);
  };

  const { selectFromGallery } = useSelectFromGallery();

  const handleSelectOptionImage = async () => {
    const s3Keys = await selectFromGallery(1, 'image');

    if (s3Keys.length === 0) return;
    const newOption = { ...option, photo: s3Keys[0] };
    handleUpdateOption(newOption);
  };

  const handleRemoveOptionImage = () => {
    const newOption = { ...option, photo: '' };
    handleUpdateOption(newOption);
  };

  const handleIncreaseIndex = () => {
    if (index === lastIndex) return;
    handleSwapElement(index, index + 1);
  };

  const handleDecreaseIndex = () => {
    if (index === 0) return;
    handleSwapElement(index, index - 1);
  };

  return (
    <div className="flex gap-x-4 px-10">
      {!option.photo && (
        <div
          className="flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 tooltip tooltip-bottom w-16 aspect-square"
          data-tip="Select option image"
          onClick={handleSelectOptionImage}
        >
          <BiImageAdd fontSize={36} />
        </div>
      )}
      {option.photo && (
        <div className="relative bg-gray-100 w-16 aspect-square">
          <img
            className="object-contain w-full h-full"
            src={getS3FileUrl(option.photo)}
          />
          <span
            onClick={handleRemoveOptionImage}
            className="absolute -top-2 -right-2 hover:text-red-400 cursor-pointer"
          >
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
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="" className="block">
          Price:
        </label>
        <input
          type="number"
          name="price"
          onChange={handleInputChange}
          value={option.price || ''}
          min="0"
          max="99999"
          className="border outline-none h-7 px-3 w-36 rounded-sm placeholder:text-sm"
        />
      </div>
      <div className="flex gap-x-4 items-center self-end h-8">
        <button
          type="button"
          className="hover:text-red-400 cursor-pointer tooltip tooltip-top"
          data-tip="remove option"
          onClick={() => handleRemoveOption(option.id)}
        >
          <AiTwotoneDelete size={26} />
        </button>
        <button
          type="button"
          className={`hover:text-primary -pointer tooltip tooltip-top ${
            index === 0 ? 'pointer-events-none text-gray-400' : ''
          }`}
          data-tip="go up"
          onClick={handleDecreaseIndex}
        >
          <BsFillArrowUpCircleFill size={22} />
        </button>
        <button
          type="button"
          className={`hover:text-primary cursor-pointer tooltip tooltip-top ${
            index === lastIndex ? 'pointer-events-none text-gray-400' : ''
          }`}
          data-tip="go down"
          onClick={handleIncreaseIndex}
        >
          <BsFillArrowDownCircleFill size={22} />
        </button>
      </div>
    </div>
  );
}

export default OptionInputs;
