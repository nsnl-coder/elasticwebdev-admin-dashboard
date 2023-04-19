import useConfirm from '@src/hooks/useConfirm';
import { Children } from '@src/types/shared';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useCallback, useEffect, useState } from 'react';

interface Props extends Children {
  className?: string;
  isDirty: boolean;
}

function UpdatePageWrapper(props: Props): JSX.Element {
  const { isDirty } = props;
  const { isConfirmed } = useConfirm();
  const [nextPath, setNextPath] = useState<string | null>(null);
  const router = useRouter();

  const onRouteChangeStart = useCallback(
    (nextPath: string) => {
      if (isDirty) {
        console.log('this run');

        setNextPath(nextPath);
        nProgress.done();
        router.events.emit('routeChangeError');
        throw 'User cancel route change! You can savely ignore this message!';
      }
    },
    [isDirty],
  );

  const confirmToLeave = async () => {
    const isConfirm = await isConfirmed(
      'You have unsaved changes, do you really want to leave?',
    );

    if (isConfirm && nextPath) {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.push(nextPath);
      console.log('pushed' + nextPath);
    }
    setNextPath(null);
  };

  useEffect(() => {
    if (!nextPath) return;
    confirmToLeave();
  }, [nextPath]);

  useEffect(() => {
    if (!router.query.id) return;
    if (router.query.id === 'create') return;

    router.events.on('routeChangeStart', onRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
  }, [onRouteChangeStart]);

  return (
    <div className={`px-6 ${props.className} mx-auto max-w-5xl pb-32 `}>
      {props.children}
    </div>
  );
}

export default UpdatePageWrapper;
