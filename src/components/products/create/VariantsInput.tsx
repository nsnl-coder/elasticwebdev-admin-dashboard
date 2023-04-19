import { useEffect, useState } from 'react';
import Variant, { TVariant } from './Variant';
import { v4 } from 'uuid';
import { MdPlaylistAdd } from 'react-icons/md';
import { Control, Controller, useController } from 'react-hook-form';
import Label, { LabelProps } from '@src/shared/form/Label';

interface Props extends LabelProps {
  control: Control<any, any>;
  defaultValue: any;
  errors: any;
}

function Variants(props: Props): JSX.Element {
  const { control, defaultValue, fieldName, errors, labelTheme } = props;
  const [variants, setVariants] = useState<TVariant[]>([]);
  const { field } = useController({ name: fieldName, control });

  const addNewVariant = () => {
    const variantId = v4();
    setVariants((prev) => [
      ...prev,
      { id: variantId, options: [{ id: v4(), variantId }] },
    ]);
  };

  useEffect(() => {
    if (!variants.length) return;

    field.onChange(variants);
  }, [variants]);

  return (
    <div>
      <Label fieldName={fieldName} labelTheme={labelTheme} />
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={fieldName}
        render={() => (
          <div className="flex flex-col gap-y-8">
            {variants.map((variant) => (
              <Variant
                key={variant.id}
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
        )}
      />
    </div>
  );
}

export default Variants;
