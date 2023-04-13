import useConfirm from '@src/hooks/useConfirm';

export default function Home() {
  const { isConfirmed } = useConfirm();

  const onClickHandler = async () => {
    const result = await isConfirmed('Do you want to delete the file?');
    console.log(result);
  };

  return (
    <div>
      <button type="button" onClick={onClickHandler} className="btn">
        open prompt
      </button>
    </div>
  );
}
