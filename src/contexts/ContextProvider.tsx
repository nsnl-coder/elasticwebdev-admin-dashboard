import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
//
import { queryClient, QueryClientProvider } from '@src/react-query/queryClient';
import { store } from '@src/store';
import ConfirmContextProvider from '@src/contexts/ConfirmContextProvider';
import GalleryContextProvider from '@src/contexts/GalleryContextProvider';
import { Children } from '@src/types/shared';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function ContextProvider(props: Children): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SkeletonTheme borderRadius={0}>
          <DndProvider backend={HTML5Backend}>
            <ConfirmContextProvider>
              <GalleryContextProvider>{props.children}</GalleryContextProvider>
            </ConfirmContextProvider>
          </DndProvider>
        </SkeletonTheme>
      </Provider>
    </QueryClientProvider>
  );
}

export default ContextProvider;
