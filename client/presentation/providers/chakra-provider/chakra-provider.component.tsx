import { ChakraProvider as ChakraProviderWrapper, extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat';
import '@fontsource/raleway';

import { IChakraProviderProps } from './chakra-provider.types';

const theme = extendTheme({
  colors: {
    gray: {
      50: '#F7F7F7',
      900: '#1F1F1F',
    },
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Raleway', sans-serif",
  },
});

export const ChakraProvider = ({ children }: IChakraProviderProps): JSX.Element => (
  <ChakraProviderWrapper theme={theme}>{children}</ChakraProviderWrapper>
);
