import { ToastContainer } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import GetCurrentUser from './GetCurrentUser';
import PreviewOriginalFile from './PreviewOriginalFile';
import CustomDragPreview from './CustomDragLayer';
import GalleryContainer from './GalleryContainer';

function UiContainer(): JSX.Element {
  return (
    <div>
      <GetCurrentUser />
      <GalleryContainer />
      <ToastContainer />
      <ConfirmModal />
      <PreviewOriginalFile />
      <CustomDragPreview />
    </div>
  );
}

export default UiContainer;
