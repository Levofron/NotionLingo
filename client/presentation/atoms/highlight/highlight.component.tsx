import { Highlight as ChakraHighlight } from '@chakra-ui/react';
import { FC } from 'react';

import { HighlightProps } from './highlight.types';

export const Highlight: FC<HighlightProps> = ({ styles, ...restProps }): JSX.Element => (
  <ChakraHighlight
    styles={{
      px: { base: 1, sm: 2 },
      py: { base: 0, sm: 1 },
      bg: 'transparent',
      border: '2px solid',
      borderRadius: 10,
      borderColor: 'gray.900',
      color: 'gray.900',
      ...styles,
    }}
    {...restProps}
  />
);
