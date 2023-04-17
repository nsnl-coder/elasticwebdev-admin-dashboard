import imageOrVideo from '@src/utils/imageOrVideo';
import VideoPlayer, { VideoProps } from './VideoPlayer';
import getS3FileUrl from '@src/utils/getFileUrl';

interface Props extends VideoProps {
  src: string;
  className?: string;
}

function FilePreview(props: Props): JSX.Element {
  let { src, className = 'h-full w-full object-cover' } = props;

  let fileType: 'video' | 'image' | undefined;

  fileType = imageOrVideo(src);

  if (!src.startsWith('http') && !src.startsWith('blob')) {
    src = getS3FileUrl(src);
  }

  if (fileType === 'video') {
    return <VideoPlayer src={src} className={className} />;
  }

  if (fileType === 'image') {
    return <img src={src} className={className} />;
  }

  return <div>Cannot identify file type, try again later!</div>;
}

export default FilePreview;
