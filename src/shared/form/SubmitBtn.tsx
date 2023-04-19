import { useRouter } from 'next/router';

function SubmitBtn(): JSX.Element {
  const id = useRouter().query.id;

  return (
    <button type="submit" className="btn">
      {id === 'create' ? 'Create' : 'Save'}
    </button>
  );
}

export default SubmitBtn;
