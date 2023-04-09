import useLogout from '@src/react-query/auth/useLogOut';
import ContentWrapper from '../hoc/ContentWrapper';

function Header(): JSX.Element {
  const { logout } = useLogout();

  return (
    <ContentWrapper className="h-16 bg-white border-b flex items-center justify-end pr-16">
      <button
        onClick={logout}
        type="button"
        className="text-blue-600 hover:underline hover:text-blue-800"
      >
        Logout
      </button>
    </ContentWrapper>
  );
}

export default Header;
