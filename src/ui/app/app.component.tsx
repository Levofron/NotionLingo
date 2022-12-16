import { useEffect } from 'react';

import { ChakraProvider, UserProvider } from '../providers';
import { IAppProps } from './app.types';
import { createDevToolsClient } from './utils';

export const App = ({ Component, pageProps }: IAppProps) => {
  useEffect(() => {
    createDevToolsClient();
  }, []);

  return (
    <ChakraProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
};
