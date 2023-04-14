type LabelThemes = 'light' | 'bold';

interface Props {
  theme: LabelThemes;
  required: boolean;
  label: string;
  fieldName: string;
}

function Label(props: Props): JSX.Element {
  const { fieldName, required = false, theme = 'light', label } = props;

  return (
    <label
      htmlFor={fieldName}
      className={`${
        theme === 'light'
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
export type { LabelThemes };
