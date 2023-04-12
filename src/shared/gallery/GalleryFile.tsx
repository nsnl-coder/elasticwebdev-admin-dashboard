import imageOrVideo from '@src/utils/imageOrVideo';
import S3Player from '../videoPlayer/S3Player';
import GalleryImage from './GalleryImage';

interface Props {
  src: string;
}

function GalleryFile(props: Props): JSX.Element {
  const { src } = props;
  const filetype = imageOrVideo(src);

  if (filetype === 'video') {
    return <S3Player src={src} />;
  }

  return <GalleryImage src={src} />;
}

export default GalleryFile;
