import { FC, useEffect, useRef } from 'react';

import { Box } from '@ui/atoms';
import { BackToTopButton } from '@ui/organisms';

import { scrollToTop } from '@infrastructure/functions';
import { useRouter } from '@infrastructure/hooks';

import { ILayoutProviderProps } from './layout-provider.types';

export const LayoutProvider: FC<ILayoutProviderProps> = ({ children }): JSX.Element => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => scrollToTop(containerRef.current), [router.pathname]);

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
