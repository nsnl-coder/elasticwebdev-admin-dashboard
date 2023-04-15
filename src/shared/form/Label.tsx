type LabelThemes = 'light' | 'bold';

interface LabelProps {
  labelTheme: LabelThemes;
  required?: boolean;
  label?: string;
  fieldName: string;
}

function Label(props: LabelProps): JSX.Element {
  const { fieldName, required = false, labelTheme = 'light', label } = props;

  return (
    <label
      htmlFor={fieldName}
      className={`${
        labelTheme === 'light'
          ? 'capitalize flex gap-x-1 text-sm mb-3'
          : 'font-semibold mb-6 text-lg capitalize block'
      }`}
    >
      <span>{label || fieldName}</span>
      {required && <span className="text-red-400">*</span>}
    </label>
  );
}

export default Label;
export type { LabelThemes, LabelProps };
