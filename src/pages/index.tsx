import useSelectFromGallery from '@src/hooks/useSelectFromGallery';

export default function Home() {
  const { selectFromGallery } = useSelectFromGallery();

  const handleOnClick = async () => {
    const files = await selectFromGallery();
  };

  return (
    <button className="btn" onClick={handleOnClick}>
      open gallery
    </button>
  );
}
