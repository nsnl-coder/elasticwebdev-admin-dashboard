import useLogOut from '@src/react-query/auth/useLogOut';
import TableWrapper from '../table/TableWrapper';

function Header(): JSX.Element {
  const { logout, isLoggingOut } = useLogOut();

  return (
    <TableWrapper className="h-16 bg-white border-b flex items-center justify-end pr-16">
      <button
        onClick={() => logout()}
        type="button"
        className={`text-blue-600 hover:underline hover:text-blue-800 ${
          isLoggingOut ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Logout
      </button>
    </TableWrapper>
  );
}

export default Header;
