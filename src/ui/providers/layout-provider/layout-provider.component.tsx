import { FC, useRef } from 'react';

import { BackToTopButton, Box } from '@ui/atoms';

import { ILayoutProviderProps } from './layout-provider.types';

export const LayoutProvider: FC<ILayoutProviderProps> = ({ children }): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style global jsx>{`
        body,
        html,
        #__next {
          height: 100%;
        }
      `}</style>
      <Box ref={containerRef} bg="gray.50" height="100%" overflow="scroll" width="100%">
        {children}
        <BackToTopButton containerRef={containerRef} />
      </Box>
    </>
  );
};
