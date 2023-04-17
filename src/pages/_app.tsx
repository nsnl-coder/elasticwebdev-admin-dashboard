import { Public_Sans } from 'next/font/google';
import type { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import axios from 'axios';

// src
import CommonLayout from '@src/shared/layout/CommonLayout';
import RequireAdmin from '@src/shared/requireAdmin/RequireAdmin';
import UiContainer from '@src/shared/uiContainer/UiContainer';
import ContextProvider from '@src/contexts/ContextProvider';

// css
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '@src/styles/globals.scss';

const publicSans = Public_Sans({ subsets: ['latin'] });
axios.defaults.baseURL = 'http://localhost:5000';

export type NextApplicationPage = NextComponentType<
  NextPageContext,
  any,
  any
> & {
  requireAdmin?: boolean;
};

function App(props: AppProps): JSX.Element {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  return (
    <ContextProvider>
      <main className={publicSans.className}>
        {Component.requireAdmin === false ? (
          <Component {...pageProps} />
        ) : (
          <RequireAdmin>
            <CommonLayout>
              <Component {...pageProps} />
            </CommonLayout>
          </RequireAdmin>
        )}
        <UiContainer />
      </main>
    </ContextProvider>
  );
}

export default App;
