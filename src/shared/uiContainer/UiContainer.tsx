import { ToastContainer } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import GetCurrentUser from './GetCurrentUser';
import Gallery from '../gallery/Gallery';

function UiContainer(): JSX.Element {
  return (
    <div>
      <GetCurrentUser />
      <Gallery />
      <ToastContainer />
      <ConfirmModal />
    </div>
  );
}

export default UiContainer;
