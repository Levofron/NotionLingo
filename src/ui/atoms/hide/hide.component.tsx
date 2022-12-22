import { Hide as ChakraHide } from '@chakra-ui/react';
import { FC } from 'react';

import { IHideProps } from './hide.types';

export const Hide: FC<IHideProps> = ({ children, ...restProps }): JSX.Element => (
  <ChakraHide {...restProps}>{children}</ChakraHide>
);
