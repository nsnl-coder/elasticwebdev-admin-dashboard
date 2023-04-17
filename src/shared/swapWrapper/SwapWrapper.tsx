import { Children } from '@src/types/shared';
import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface Props extends Children {
  id: string;
  className?: string;
  payload?: any;
  swapPosition: (id1: string, id2: string) => void;
  itemType: string;
}

function SwapWrapper(props: Props): JSX.Element {
  const { id, swapPosition, children, className, payload, itemType } = props;
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
    [ref],
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  // accept drop
  const [{ canDrop }, drop] = useDrop<any, any, any>(
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
        swapPosition(item.id, id);
      },
    }),
    [ref],
  );

  useEffect(() => {
    console.log(ref.current?.offsetWidth);
    console.log(ref.current?.offsetHeight);
  }, [ref.current?.offsetWidth]);

  return (
    <div
      ref={(node) => {
        drop(node);
        drag(node);
        ref.current = node;
      }}
      className={className}
    >
      {/* {isDragging && <div className="w-full h-full bg-gray-300"></div>} */}
      {/* <div>dsaaaaaaaaaaaa</div> */}
      {children}
    </div>
  );
}

export default SwapWrapper;
