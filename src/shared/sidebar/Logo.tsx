import Image from 'next/image';
import Link from 'next/link';

function Logo(): JSX.Element {
  return (
    <div className="px-5 w-full border-b h-16 flex items-center py-2">
      <Link href="/" className="h-16 flex items-center">
        <Image
          src="/images/logo.png"
          width={130}
          height={29}
          alt="site logo"
          className="w-32 object-contain"
          priority={true}
        />
      </Link>
    </div>
  );
}

export default Logo;
