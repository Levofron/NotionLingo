import { Highlight as ChakraHighlight } from '@chakra-ui/react';
import { FC } from 'react';

import { IHighlightProps } from './highlight.types';

export const Highlight: FC<IHighlightProps> = ({ children, ...restProps }): JSX.Element => (
  <ChakraHighlight {...restProps}>{children}</ChakraHighlight>
);
