import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { createDevToolsClient } from '@ui/utils';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    createDevToolsClient();
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
