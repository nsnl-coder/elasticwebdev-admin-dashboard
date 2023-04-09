import { useAppSelector } from '@src/hooks/redux';
import { Children } from '@src/types/shared';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function RequireNotLogin(props: Children): JSX.Element | null {
  const router = useRouter();
  const { children } = props;

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!router.isReady) return;

    if (auth.user?.role === 'admin') {
      router.push({
        pathname: '/',
      });
    }
  }, [router.isReady, auth.user?.role]);

  if (auth.user?.role !== 'admin') {
    return <>{children}</>;
  }

  return null;
}

export default RequireNotLogin;
