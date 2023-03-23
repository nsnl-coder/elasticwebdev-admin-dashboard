import Sidebar from '../sidebar/Sidebar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function CommonLayout(props: Props): JSX.Element {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="bg-gray-50 flex-grow h-screen overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
}

export default CommonLayout;
