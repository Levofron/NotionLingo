import { SpinnerProps as ChakraSpinnerProps } from '@chakra-ui/react';

export interface SpinnerProps extends ChakraSpinnerProps {
  mode?: ThemeMode;
}
