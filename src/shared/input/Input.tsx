interface Props {
  fieldName: string;
  register: any;
  errors: any;
  label?: string;
  required?: boolean;
  type?: string;
}

function Input(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    errors,
    label,
    required = true,
    type = 'text',
  } = props;

  return (
    <div className="mb-6 space-y-1">
      <label htmlFor={fieldName} className="capitalize flex gap-x-1">
        <span> {label || fieldName}</span>
        {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        id={fieldName}
        {...register(fieldName, { required: true })}
        className="border px-2 py-2 w-full"
        placeholder={fieldName}
      />
      <p className="text-sm text-red-400">{errors[fieldName]?.message}</p>
    </div>
  );
}

export default Input;
