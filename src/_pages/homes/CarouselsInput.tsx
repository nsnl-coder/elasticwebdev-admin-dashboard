import { Children } from '@src/types/shared';
import { Control, UseFormRegister, useFieldArray } from 'react-hook-form';
import { IoMdTrash } from 'react-icons/io';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
//
import { LabelProps } from '@src/components/form/Label';
import FilesInput from '@src/components/inputs/FilesInput';
import Input from '@src/components/inputs/Input';
import { MdViewCarousel } from 'react-icons/md';

interface Props extends LabelProps, Children {
  register: UseFormRegister<any>;
  errors: any;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  control: Control<any>;
}

function CarouselsInput(props: Props): JSX.Element {
  const { control, fieldName, register, errors } = props;
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: fieldName,
  });

  const indexUp = (index: number) => {
    if (index >= 1) {
      swap(index, index - 1);
    }
  };

  const indexDown = (index: number) => {
    if (index < fields.length - 1) {
      swap(index, index + 1);
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-x-4">
          <div className="flex flex-col justify-between">
            <FilesInput
              allowedTypes="image"
              control={control}
              fieldName={`${fieldName}.${index}.photo`}
              errors={errors}
              labelTheme="light"
              maxFilesCount={1}
              showUploadLabel={false}
              className="w-24"
            />
            <div>
              <div className="flex gap-x-3 items-center">
                <IoMdTrash
                  size={26}
                  onClick={() => remove(index)}
                  className="hover:text-red-400 cursor-pointer"
                />
                <BsFillArrowUpCircleFill
                  size={20}
                  onClick={() => indexUp(index)}
                  className="hover:cursor-pointer hover:text-accent"
                />
                <BsFillArrowDownCircleFill
                  size={20}
                  onClick={() => indexDown(index)}
                  className="hover:cursor-pointer hover:text-accent"
                />
              </div>
            </div>
          </div>
          <div className="flex-grow space-y-3">
            <Input
              register={register}
              errors={errors}
              fieldName={`${fieldName}.${index}.title`}
              labelTheme="light"
              placeholder="title"
              className="outline-0 border-gray-200"
              maxLength={250}
            />
            <Input
              register={register}
              errors={errors}
              fieldName={`${fieldName}.${index}.description`}
              labelTheme="light"
              placeholder="description"
              maxLength={500}
              className="outline-0 border-gray-200"
            />
            <Input
              register={register}
              errors={errors}
              fieldName={`${fieldName}.${index}.link`}
              labelTheme="light"
              placeholder="redirect link"
              className="outline-0 border-gray-200"
              maxLength={255}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({})}
        className="mt-4 flex gap-x-2 items-center border justify-center w-full py-2 rounded-md"
      >
        <span className="font-medium">Add carousel</span>
        <MdViewCarousel size={20} />
      </button>
    </div>
  );
}

export default CarouselsInput;
