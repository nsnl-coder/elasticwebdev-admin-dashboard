import Variant, { TVariant } from './Variant';
import { v4 } from 'uuid';
import { LabelProps } from '@src/shared/form/Label';
import { Control, useController } from 'react-hook-form';
import { MdPlaylistAdd } from 'react-icons/md';

interface Props extends LabelProps {
  control: Control<any, any>;
  errors: any;
}

function VariantsInput(props: Props): JSX.Element {
  const { control, fieldName } = props;

  const { field } = useController({
    name: fieldName,
    control,
    defaultValue: [],
  });

  const setVariants = (fn: (variansts: TVariant[]) => TVariant[]) => {
    const newVariants = fn(field.value);
    field.onChange(newVariants);
  };

  const addNewVariant = () => {
    const variantId = v4();
    setVariants((prev) => [
      ...prev,
      { _id: variantId, options: [{ _id: v4(), variantId }] },
    ]);
  };
  const variants: any[] = field.value || [];

  return (
    <div className="flex flex-col gap-y-12">
      {variants.map((variant) => (
        <Variant
          key={variant._id}
          variant={variant}
          setVariants={setVariants}
        />
      ))}
      <button
        type="button"
        onClick={addNewVariant}
        className="duration-150 border py-2 font-medium hover:font-semibold flex gap-x-3 justify-center hover:bg-gray-50 group text-green-700"
      >
        <span>Add new variant</span>
        <span className="text-2xl">
          <MdPlaylistAdd />
        </span>
      </button>
    </div>
  );
}

export default VariantsInput;
