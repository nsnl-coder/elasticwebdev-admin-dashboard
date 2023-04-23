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
          <div key={i} className={className}>
            <Skeleton className={'h-full w-full'} />
          </div>
        ))}
    </>
  );
}

export default GridSkeleton;
