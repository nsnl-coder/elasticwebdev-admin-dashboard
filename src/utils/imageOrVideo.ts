import path from 'path';

const imageOrVideo = (key: string) => {
  const extension = path.extname(key);

  const imageExtensions = ['.jpeg', '.png', '.webp', '.gif', '.bmp'];
  const videoExtensions = [
    '.mp4',
    '.quicktime',
    '.x-ms-mv',
    '.x-msvideo',
    '.mpeg',
  ];

  if (imageExtensions.includes(extension)) return 'image';
  if (videoExtensions.includes(extension)) return 'video';
};

export default imageOrVideo;
