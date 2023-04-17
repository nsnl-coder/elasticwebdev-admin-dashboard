import FilePreview from '@src/shared/filePreview/FilePreview';
import { DRAG_TYPES } from '@src/types/enum';
import { useEffect, useRef } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';

const getStyles = (
  sourceClientOffset: XYCoord | null,
  pointerOffset: XYCoord | null,
  width: number,
  height: number,
) => {
  if (!sourceClientOffset || !pointerOffset || !width || !height) {
    return {
      display: 'none',
    };
  }

  let { x, y } = sourceClientOffset;
  const { x: pointerX, y: pointerY } = pointerOffset;

  // prevent point go outside of image
  if (x + width < pointerX || y + height < pointerY) {
    x = pointerX - width / 2;
    y = pointerY - height / 2;
  }

  //
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    width: width + 'px',
    height: height + 'px',
  };
};

const CustomDragPreview = () => {
  const { isDragging, item, itemType, sourceOffset, pointerOffset } =
    useDragLayer((monitor) => ({
      isDragging: monitor.isDragging(),
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
      sourceOffset: monitor.getSourceClientOffset(),
      pointerOffset: monitor.getClientOffset(),
    }));

  console.log('this run');

  useEffect(() => {
    if (!isDragging) console.log('sideeffect');
  }, [isDragging]);

  if (!isDragging) return null;

  let preview = null;
  let wrapperClassName = '';

  switch (itemType) {
    case DRAG_TYPES.FILE:
      wrapperClassName = 'rounded-md overflow-hidden';
      preview = <FilePreview src={item.s3Key} />;
      break;
  }

  let width = item?.ref?.current?.offsetWidth || 0;
  let height = item?.ref?.current?.offsetHeight || 0;

  const styles = isDragging
    ? getStyles(sourceOffset, pointerOffset, width, height)
    : {};

  if (!isDragging) {
    wrapperClassName = 'duration-500';
  }

  return (
    <div className="fixed pointer-events-none left-0 top-0 z-50">
      <div style={styles} className={wrapperClassName}>
        {preview}
      </div>
    </div>
  );
};

export default CustomDragPreview;
