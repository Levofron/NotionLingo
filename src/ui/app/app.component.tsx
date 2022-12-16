import { useEffect } from 'react';

import { ChakraProvider } from '../providers';
import { IAppProps } from './app.types';
import { createDevToolsClient } from './utils';

export const App = ({ Component, pageProps }: IAppProps) => {
  useEffect(() => {
    createDevToolsClient();
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};
