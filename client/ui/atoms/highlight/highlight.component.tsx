import { Highlight as ChakraHighlight } from '@chakra-ui/react';
import { FC } from 'react';

import { IHighlightProps } from './highlight.types';

export const Highlight: FC<IHighlightProps> = ({ styles, ...restProps }): JSX.Element => (
  <ChakraHighlight
    styles={{
      px: { base: 1, sm: 2 },
      py: { base: 0, sm: 1 },
      bg: 'transparent',
      border: '2px solid',
      borderColor: 'gray.900',
      color: 'gray.900',
      ...styles,
    }}
    {...restProps}
  />
);
