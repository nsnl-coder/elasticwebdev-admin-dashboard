import { useState } from 'react';
import Variant, { TVariant } from './Variant';
import { v4 } from 'uuid';

function Variants(): JSX.Element {
  const [variants, setVariants] = useState<TVariant[]>([]);

  const addNewVariant = () => {
    const variantId = v4();
    setVariants((prev) => [
      ...prev,
      { id: variantId, options: [{ id: v4(), variantId }] },
    ]);
  };

  return (
    <div className="flex flex-col gap-y-12">
      {variants.map((variant) => (
        <Variant key={variant.id} variant={variant} setVariants={setVariants} />
      ))}
      <button type="button" onClick={addNewVariant}>
        Add new variant
      </button>
    </div>
  );
}

export default Variants;
