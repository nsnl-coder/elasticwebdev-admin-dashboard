import { Children } from '@src/types/shared';
import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface Props extends Children {
  id: string;
  className?: string;
  isOverClassName?: string;
  payload?: any;
  itemType: string;
  swapOn: 'hover' | 'drop';
  disableGrayBg?: boolean;

  swapPosition: (id1: string, id2: string) => void;
}

function SwapWrapper(props: Props): JSX.Element {
  const {
    id,
    swapPosition,
    children,
    className,
    payload,
    itemType,
    swapOn = 'hover',
    disableGrayBg,
    isOverClassName,
  } = props;
  const ref = useRef<null | HTMLDivElement>(null);

  // enable drag
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: itemType,
      item: {
        id,
        ref,
        payload,
      },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [ref, payload],
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  // accept drop
  const [{ isOver }, drop] = useDrop<any, any, any>(
    () => ({
      accept: itemType,
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
      canDrop(item) {
        return item.id !== id;
      },
      hover(item) {
        if (item.id === id) return;
        if (swapOn !== 'hover') return;

        swapPosition(item.id, id);
      },
      drop(item) {
        if (item.id === id) return;
        if (swapOn !== 'drop') return;

        swapPosition(item.id, id);
      },
    }),
    [ref],
  );

  return (
    <div
      ref={(node) => {
        drop(node);
        drag(node);
        ref.current = node;
      }}
      className={`relative ${className} z-20 ${isOver ? isOverClassName : ''}`}
    >
      {children}
      {isDragging && !disableGrayBg && (
        <div className="w-full h-full bg-gray-200 absolute top-0 left-0 z-20"></div>
      )}
    </div>
  );
}

export default SwapWrapper;
