import { useEffect } from 'react';

import {
  ChakraProvider,
  LayoutProvider,
  RouterProvider,
  UserProvider,
  WrapBalancerProvider,
} from '../providers';
import { AppProps } from './app.types';
import { createDevToolsClient, fillUpMissedLocalStorageFields } from './utils';

export const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    createDevToolsClient();
    fillUpMissedLocalStorageFields();
  }, []);

  return (
    <RouterProvider>
      <WrapBalancerProvider>
        <ChakraProvider>
          <UserProvider>
            <LayoutProvider>
              <Component {...pageProps} />
            </LayoutProvider>
          </UserProvider>
        </ChakraProvider>
      </WrapBalancerProvider>
    </RouterProvider>
  );
};
