import { useEffect } from 'react';

import { ChakraProvider, LayoutProvider, UserProvider, WrapBalancerProvider } from '../providers';
import { IAppProps } from './app.types';
import { createDevToolsClient, fillUpMissedLocalStorageFields } from './utils';

export const App = ({ Component, pageProps }: IAppProps) => {
  useEffect(() => {
    createDevToolsClient();
    fillUpMissedLocalStorageFields();
  }, []);

  return (
    <WrapBalancerProvider>
      <ChakraProvider>
        <UserProvider>
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
        </UserProvider>
      </ChakraProvider>
    </WrapBalancerProvider>
  );
};
