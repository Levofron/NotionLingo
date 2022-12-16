import { ChakraProvider as ChakraProviderWrapper } from '@chakra-ui/react';

import { IChakraProviderProps } from './chakra-provider.types';

export const ChakraProvider = ({ children }: IChakraProviderProps): JSX.Element => (
  <ChakraProviderWrapper>{children}</ChakraProviderWrapper>
);
