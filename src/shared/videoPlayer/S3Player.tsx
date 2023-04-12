import VideoPlayer from './VideoPlayer';

interface Props {
  autoplay?: boolean;
  controls?: boolean;
  src: string;
  type?: string;
  className?: string;
  aspectRatio?: '16:9' | '1:1' | '9:16' | 'auto';
  theme?: 'city' | 'fantasy' | 'forest' | 'sea';
}

function S3Player(props: Props): JSX.Element {
  const { src, ...otherProps } = props;

  let videoLink = src.startsWith('http')
    ? src
    : `${process.env.NEXT_PUBLIC_S3_BUCKET}/${src}`;

  return <VideoPlayer {...otherProps} src={videoLink} />;
}

export default S3Player;
