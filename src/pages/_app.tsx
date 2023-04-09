import { Public_Sans } from 'next/font/google';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { NextComponentType, NextPageContext } from 'next';
import { ToastContainer } from 'react-toastify';

//
import CommonLayout from '@src/shared/layout/CommonLayout';
import { store } from '@src/store';
import RequireAdmin from '@src/shared/requireAdmin/RequireAdmin';
import GetCurrentUser from '@src/shared/getCurrentUser/GetCurrentUser';
import 'react-toastify/dist/ReactToastify.css';
import '@src/styles/globals.scss';

const publicSans = Public_Sans({ subsets: ['latin'] });

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
    <Provider store={store}>
      <GetCurrentUser />
      <ToastContainer />
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
      </main>
    </Provider>
  );
}

export default App;
