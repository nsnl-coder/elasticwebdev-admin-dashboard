import { useAppSelector } from '@src/hooks/redux';
import useGetCurrentUser from '@src/react-query/auth/useGetCurrentUser';

function GetCurrentUser(): JSX.Element | null {
  useGetCurrentUser();

  return null;
}

export default GetCurrentUser;
