import { ToastContainer } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import GetCurrentUser from './GetCurrentUser';
import Gallery from '../gallery/Gallery';
import PreviewOriginalFile from './PreviewOriginalFile';

function UiContainer(): JSX.Element {
  return (
    <div>
      <GetCurrentUser />
      <Gallery />
      <ToastContainer />
      <ConfirmModal />
      <PreviewOriginalFile />
    </div>
  );
}

export default UiContainer;
