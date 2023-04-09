import { FC, memo } from 'react';

import { Box } from '../box/box.component';
import { ITextUnderlineProps } from './text-underline.types';

const TextUnderlineComponent: FC<ITextUnderlineProps> = ({
  children,
  mode = 'dark',
}): JSX.Element => {
  const color = mode === 'light' ? 'gray.50' : 'gray.900';

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

export const TextUnderline = memo(TextUnderlineComponent);
