import { Public_Sans } from 'next/font/google';
import type { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import axios from 'axios';
import Router from 'next/router';
import nprogress from 'nprogress';
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
import 'nprogress/nprogress.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const publicSans = Public_Sans({ subsets: ['latin'] });
axios.defaults.baseURL = 'http://localhost:5000';

Router.events.on('routeChangeStart', nprogress.start);
Router.events.on('routeChangeError', nprogress.done);
Router.events.on('routeChangeComplete', nprogress.done);

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
        <ReactQueryDevtools />
      </main>
    </ContextProvider>
  );
}

export default App;
