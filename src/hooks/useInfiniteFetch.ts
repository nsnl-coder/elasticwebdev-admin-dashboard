import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  hasNextPage: boolean | undefined;
  fetchNextPage: any;
}

const useInfiniteFetch = (props: Props) => {
  const { hasNextPage, fetchNextPage } = props;

  const observer = useRef<null | IntersectionObserver>(null);

  const lastElementRef = useCallback(
    (node: any) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      observer.current.observe(node);
    },
    [hasNextPage],
  );

  return { lastElementRef };
};

export default useInfiniteFetch;