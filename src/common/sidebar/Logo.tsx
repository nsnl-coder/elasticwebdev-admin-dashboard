import Image from 'next/image';
import Link from 'next/link';

function Logo(): JSX.Element {
  return (
    <div className="px-5 pt-4 pb-3 -z-10 shadow-md group-hover:shadow-lg">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={332}
          height={74}
          alt="site logo"
          className="w-32 object-contain"
        />
      </Link>
    </div>
  );
}

export default Logo;
