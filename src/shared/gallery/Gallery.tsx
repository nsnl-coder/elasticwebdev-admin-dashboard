import useUploadFiles from '@src/hooks/useSelectFiles';
import UploadLabel from '../uploadFiles/Label';
import GalleryImage from './GalleryImage';

function Gallery(): JSX.Element {
  return (
    <div>
      <label htmlFor="gallery" className="btn">
        open modal
      </label>

      <input type="checkbox" id="gallery" className="modal-toggle" />
      <label htmlFor="gallery" className="modal px-6 cursor-pointer">
        <label className="modal-box overflow-y-auto small-scrollbar relative max-w-6xl w-screen h-screen rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 content-start gap-4">
          <UploadLabel />
          <GalleryImage src="" />
          <GalleryImage src="" />
          <GalleryImage src="" />
          <GalleryImage src="" />
          <GalleryImage src="" />
          <GalleryImage src="" />
          <GalleryImage src="" />
        </label>
      </label>
    </div>
  );
}

export default Gallery;
