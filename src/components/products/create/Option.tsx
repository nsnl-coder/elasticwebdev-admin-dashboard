import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import getS3FileUrl from '@src/utils/getFileUrl';
import { Option } from '@src/yup/productSchema';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { HiPlusCircle } from 'react-icons/hi2';
import { IoMdRemoveCircle } from 'react-icons/io';
import { TVariant } from './Variant';
import { v4 } from 'uuid';
import { TbGridDots } from 'react-icons/tb';
import SwapWrapper from '@src/shared/swapWrapper/SwapWrapper';
import { DRAG_TYPES } from '@src/types/enum';

export interface TOption extends Option {
  id: string;
  variantId: string;
}

interface Props {
  option: TOption;
  setVariants: Dispatch<SetStateAction<TVariant[]>>;
  variantId: string;
}

function OptionInputs(props: Props): JSX.Element {
  const { option, setVariants, variantId } = props;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    let value = e.target.value;

    if (fieldName === 'price' && isNaN(Number(value))) {
      value = '';
    }

    const newOption = { ...option, [fieldName]: value, variantId };
    updateOption(newOption);
  };

  const updateOption = (newOption: TOption) => {
    setVariants((variants) => {
      const variantIndex = variants.findIndex((v) => v.id === variantId);
      if (variantIndex === -1) return variants;

      const variant = variants[variantIndex];
      const optionIndex = variant.options.findIndex(
        (o) => o.id === newOption.id,
      );
      if (optionIndex === -1) return variants;

      variant.options[optionIndex] = newOption;

      return [
        ...variants.slice(0, variantIndex),
        variant,
        ...variants.slice(variantIndex + 1),
      ];
    });
  };

  const handleRemoveOption = () => {
    setVariants((variants) => {
      const variantIndex = variants.findIndex((v) => v.id === variantId);
      if (variantIndex === -1) return variants;

      const variant = variants[variantIndex];
      const optionIndex = variant.options.findIndex((o) => o.id === option.id);
      if (optionIndex === -1) return variants;

      variant.options.splice(optionIndex, 1);

      return [
        ...variants.slice(0, variantIndex),
        variant,
        ...variants.slice(variantIndex + 1),
      ];
    });
  };

  const handleAddMoreOption = () => {
    setVariants((variants) => {
      const variantIndex = variants.findIndex((v) => v.id === variantId);
      if (variantIndex === -1) return variants;

      let variant = variants[variantIndex];
      const options = variant.options;

      const optionIndex = variant.options.findIndex((o) => o.id === option.id);
      if (optionIndex === -1) return variants;

      variant = {
        ...variant,
        options: [
          ...options.slice(0, optionIndex + 1),
          {
            id: v4(),
            variantId,
          },
          ...options.slice(optionIndex + 1),
        ],
      };

      return [
        ...variants.slice(0, variantIndex),
        variant,
        ...variants.slice(variantIndex + 1),
      ];
    });
  };

  const { selectFromGallery } = useSelectFromGallery();

  const handleSelectOptionImage = async () => {
    const s3Keys = await selectFromGallery(1, 'image');

    if (s3Keys.length === 0) return;
    const newOption = { ...option, photo: s3Keys[0] };
    updateOption(newOption);
  };

  const handleRemoveOptionImage = () => {
    const newOption = { ...option, photo: '' };
    updateOption(newOption);
  };

  const swapPosition = (dragId: string, dropId: string) => {
    setVariants((variants) => {
      const variantIndex = variants.findIndex((v) => v.id === variantId);
      const variant = variants[variantIndex];
      const options = variant.options;

      const dragIndex = options.findIndex((option) => option.id === dragId);

      const dropIndex = options.findIndex((option) => option.id === dropId);

      if (dragIndex === -1 || dropIndex == -1) return variants;

      [options[dragIndex], options[dropIndex]] = [
        options[dropIndex],
        options[dragIndex],
      ];

      return [
        ...variants.slice(0, variantIndex),
        variant,
        ...variants.slice(variantIndex + 1),
      ];
    });
  };

  return (
    <SwapWrapper
      swapPosition={swapPosition}
      id={option.id}
      itemType={DRAG_TYPES.OPTION}
      swapOn="hover"
      payload={option}
    >
      <div className="flex gap-x-4 pl-12 group py-4">
        {!option.photo && (
          <div
            className="flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 w-16 aspect-square"
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
            name="price"
            onChange={handleInputChange}
            value={option.price || ''}
            min="0"
            max="99999"
            className="border outline-none h-7 px-3 w-36 rounded-sm placeholder:text-sm"
          />
        </div>
        <div className="flex gap-x-4 items-center self-end h-8 text-zinc-600">
          <button
            type="button"
            className="hover:text-red-400 cursor-pointer"
            onClick={() => handleRemoveOption()}
          >
            <AiTwotoneDelete size={26} />
          </button>
          <button
            type="button"
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => handleAddMoreOption()}
          >
            <HiPlusCircle size={25} />
          </button>
          <button className="text-zinc-600/40 group-hover:text-zinc-600 cursor-move">
            <TbGridDots size={23} />
          </button>
        </div>
      </div>
    </SwapWrapper>
  );
}

export default OptionInputs;
