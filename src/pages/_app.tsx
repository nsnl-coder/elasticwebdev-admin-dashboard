import '@src/styles/globals.css';
import { Public_Sans } from 'next/font/google';
import type { AppProps } from 'next/app';
import CommonLayout from '@src/shared/layout/CommonLayout';

const publicSans = Public_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CommonLayout>
      <main className={publicSans.className}>
        <Component {...pageProps} />
      </main>
    </CommonLayout>
  );
}
