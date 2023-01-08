import { FC } from 'react';

import { Box } from '..';
import { ITextUnderlineProps } from './text-underline.types';

export const TextUnderline: FC<ITextUnderlineProps> = ({ children }): JSX.Element => (
  <Box
    _after={{
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      w: 'full',
      h: '10%',
      bg: 'black',
      zIndex: -1,
    }}
    as="span"
    color="black"
    position="relative"
    zIndex={10}
  >
    {children}
  </Box>
);
