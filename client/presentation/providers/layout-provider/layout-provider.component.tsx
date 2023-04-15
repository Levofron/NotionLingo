import { FC, useEffect, useRef } from 'react';

import { Box } from '@presentation/atoms';
import { BackToTopButton } from '@presentation/organisms';

import { scrollToTop } from '@shared/functions';
import { useRouter } from '@shared/hooks';

import { LayoutProviderProps } from './layout-provider.types';

export const LayoutProvider: FC<LayoutProviderProps> = ({ children }): JSX.Element => {
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
