import { ToastContainer } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import GetCurrentUser from "./GetCurrentUser";

function UiContainer(): JSX.Element {
  return (
    <div>
      <GetCurrentUser />
      <ToastContainer />
      <ConfirmModal />
    </div>
  );
}

export default UiContainer;
