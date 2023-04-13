import Skeleton from 'react-loading-skeleton';

interface Props {
  count?: number;
  className?: string;
}

function GridSkeleton(props: Props): JSX.Element {
  const { count, className } = props;

  return (
    <>
      {Array(count)
        .fill(0)
        .map((item, i) => (
          <Skeleton className={className} key={i} />
        ))}
    </>
  );
}

export default GridSkeleton;
