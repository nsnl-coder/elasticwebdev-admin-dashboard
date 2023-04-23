interface Props {
  errors: any;
  fieldName: string;
}

function ErrorMessage(props: Props): JSX.Element {
  const { errors, fieldName } = props;

  return (
    <p className="text-sm text-red-400 mt-2 mb-4">
      {errors && errors[fieldName]?.message}
    </p>
  );
}

export default ErrorMessage;