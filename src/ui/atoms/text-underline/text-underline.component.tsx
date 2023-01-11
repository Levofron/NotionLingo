import { FC } from 'react';

import { Box } from '..';
import { ITextUnderlineProps } from './text-underline.types';

export const TextUnderline: FC<ITextUnderlineProps> = ({
  children,
  variant = 'light',
}): JSX.Element => {
  const color = variant === 'light' ? 'gray.50' : 'gray.900';

  return (
    <Box
      _after={{
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        w: 'full',
        h: '10%',
        bg: color,
        zIndex: -1,
      }}
      as="span"
      color={color}
      position="relative"
      zIndex={10}
    >
      {children}
    </Box>
  );
};
