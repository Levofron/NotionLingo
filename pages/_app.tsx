import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import { createDevToolsClient } from '@ui/utils';

import '../styles/globals.css';

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
