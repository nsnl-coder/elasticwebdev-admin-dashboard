import { useState } from 'react';
import Variant, { TVariant } from './Variant';
import { v4 } from 'uuid';

function Variants(): JSX.Element {
  const [variants, setVariants] = useState<TVariant[]>([]);

  const updateVariant = (newVariant: TVariant) => {
    const copyVariants = [...variants];

    const index = variants.findIndex((variant) => variant.id === newVariant.id);

    if (index === -1) return;

    copyVariants[index] = newVariant;
    setVariants(copyVariants);
  };

  const addNewVariant = () => {
    setVariants((prev) => [...prev, { id: v4(), options: [] }]);
  };

  const deleteVariant = (id: string) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

  return (
    <div className="flex flex-col gap-y-12">
      {variants.map((variant) => (
        <Variant
          key={variant.id}
          updateVariant={updateVariant}
          variant={variant}
          deleteVariant={deleteVariant}
        />
      ))}
      <button type="button" onClick={addNewVariant}>
        Add new variant
      </button>
    </div>
  );
}

export default Variants;
