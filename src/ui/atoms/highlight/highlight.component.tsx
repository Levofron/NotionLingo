import { Highlight as ChakraHighlight } from '@chakra-ui/react';
import { FC } from 'react';

import { IHighlightProps } from './highlight.types';

export const Highlight: FC<IHighlightProps> = (props): JSX.Element => (
  <ChakraHighlight styles={{ px: '2', py: '1', bg: 'white', border: '2px solid' }} {...props} />
);
