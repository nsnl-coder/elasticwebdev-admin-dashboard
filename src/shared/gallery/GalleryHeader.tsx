function GalleryHeader(): JSX.Element {
  return (
    <div className="flex justify-between shadow-md p-8">
      <button
        type="button"
        className="bg-red-400 px-4 py-1 text-white font-semibold rounded-md"
      >
        Delete files
      </button>
      <button
        type="button"
        className="bg-primary text-white px-4 rounded-md font-semibold"
      >
        Select All
      </button>
    </div>
  );
}

export default GalleryHeader;
