import imageOrVideo from '@src/utils/imageOrVideo';
import VideoPlayer, { VideoProps } from './VideoPlayer';
import getS3FileUrl from '@src/utils/getFileUrl';

interface Props extends VideoProps {
  src: string;
  type: string;
  className?: string;
}

function FilePreview(props: Props): JSX.Element {
  let { src, type, className } = props;

  let fileType: 'video' | 'image' | undefined;

  if (type?.startsWith('image')) fileType = 'image';
  if (type?.startsWith('video')) fileType = 'video';

  if (!type || type === 'unknown') {
    fileType = imageOrVideo(src);
  }

  if (!src.startsWith('http') && !src.startsWith('blob')) {
    src = getS3FileUrl(src);
  }

  if (fileType === 'video') {
    return <VideoPlayer src={src} />;
  }

  if (fileType === 'image') {
    return <img src={src} className={className} />;
  }

  return <div>Cannot identify file type, try again later!</div>;
}

export default FilePreview;
