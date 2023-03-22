import '@src/styles/globals.css';
import { Public_Sans } from 'next/font/google';
import type { AppProps } from 'next/app';

const publicSans = Public_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={publicSans.className}>
      <Component {...pageProps} />
    </main>
  );
}
