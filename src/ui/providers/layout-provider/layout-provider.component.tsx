import { FC } from 'react';

import { Box } from '@ui/atoms';

import { ILayoutProviderProps } from './layout-provider.types';

export const LayoutProvider: FC<ILayoutProviderProps> = ({ children }): JSX.Element => (
  <>
    <style global jsx>{`
      body,
      html,
      #__next {
        height: 100%;
      }
    `}</style>
    <Box bg="gray.50" height="100%" overflow="hidden" width="100%">
      {children}
    </Box>
  </>
);
