import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import { IOption } from '@src/yup/productSchema';
import { ChangeEvent, useCallback } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { HiPlusCircle } from 'react-icons/hi2';
import { IoMdRemoveCircle } from 'react-icons/io';
import { TVariant } from './Variant';
import { v4 } from 'uuid';
import { TbGridDots } from 'react-icons/tb';
import SwapWrapper from '@src/components/swapWrapper/SwapWrapper';
import { DRAG_TYPES } from '@src/types/enum';
import FilePreview from '@src/components/filePreview/FilePreview';

export interface TOption extends IOption {
  _id: string;
  variantId: string;
}

interface Props {
  option: TOption;
  setVariants: (fn: (variansts: TVariant[]) => TVariant[]) => void;
  variantId: string;
}

function OptionsInput(props: Props): JSX.Element {
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
      const variantIndex = variants.findIndex((v) => v._id === variantId);
      if (variantIndex === -1) return variants;

      const variant = variants[variantIndex];
      const optionIndex = variant.options.findIndex(
        (o) => o._id === newOption._id,
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
      const variantIndex = variants.findIndex((v) => v._id === variantId);
      if (variantIndex === -1) return variants;

      const variant = variants[variantIndex];
      const optionIndex = variant.options.findIndex(
        (o) => o._id === option._id,
      );
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
      const variantIndex = variants.findIndex((v) => v._id === variantId);
      if (variantIndex === -1) return variants;
      let variant = variants[variantIndex];
      const options = variant.options;
      const optionIndex = variant.options.findIndex(
        (o) => o._id === option._id,
      );
      if (optionIndex === -1) return variants;
      variant = {
        ...variant,
        options: [
          ...options.slice(0, optionIndex + 1),
          {
            _id: v4(),
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

  const swapPosition = useCallback(
    (dragId: string, dropId: string) => {
      setVariants((variants) => {
        const variantIndex = variants.findIndex((v) => v._id === variantId);
        const variant = variants[variantIndex];
        const options = variant.options;
        const dragIndex = options.findIndex((option) => option._id === dragId);
        const dropIndex = options.findIndex((option) => option._id === dropId);
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
    },
    [setVariants, variantId],
  );

  return (
    <SwapWrapper
      swapPosition={swapPosition}
      id={option._id}
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
          <div className="relative bg-gray-100 w-20">
            <FilePreview
              src={option.photo}
              className="w-20 aspect-square overflow-hidden object-cover"
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
          <button className="text-zinc-600/40 group-hover:text-zinc-600">
            <TbGridDots size={23} />
          </button>
        </div>
      </div>
    </SwapWrapper>
  );
}

export default OptionsInput;
