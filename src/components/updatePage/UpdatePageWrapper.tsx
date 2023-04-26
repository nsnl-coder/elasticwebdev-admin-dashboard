import useConfirm from '@src/hooks/useConfirm';
import { Children } from '@src/types/shared';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Control, useFormState } from 'react-hook-form';

interface Props extends Children {
  className?: string;
  control: Control<any>;
}

function UpdatePageWrapper(props: Props): JSX.Element {
  const { control } = props;
  const { isDirty } = useFormState({ control });
  const id = useRouter().query.id;
  const { isConfirmed } = useConfirm();
  const [nextPath, setNextPath] = useState<string | null>(null);
  const router = useRouter();

  const onRouteChangeStart = useCallback(
    (nextPath: string) => {
      if (isDirty && id !== 'create') {
        setNextPath(nextPath);
        nProgress.done();
        router.events.emit('routeChangeError');
        throw 'User cancel route change! You can savely ignore this message!';
      }
    },
    [router.events, isDirty, id],
  );

  const confirmToLeave = useCallback(async () => {
    const isConfirm = await isConfirmed(
      'You have unsaved changes, do you really want to leave?',
    );

    if (isConfirm && nextPath) {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.push(nextPath);
    }
    setNextPath(null);
  }, [isConfirmed, nextPath, onRouteChangeStart, router]);

  useEffect(() => {
    if (!nextPath) return;
    confirmToLeave();
  }, [nextPath, confirmToLeave]);

  useEffect(() => {
    if (!router.query.id) return;
    router.events.on('routeChangeStart', onRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
  }, [onRouteChangeStart, router.query.id, router.events]);

  return (
    <div className={`px-6 ${props.className} mx-auto max-w-5xl pb-32 `}>
      {props.children}
    </div>
  );
}

export default UpdatePageWrapper;
