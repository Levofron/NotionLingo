import { useMediaQuery } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';

import { MotionIconButton } from '@ui/molecules';

import { useEventListener } from '@infrastructure/utils';

import { IBackToTopButtonProps } from './back-to-top-button.types';

export const BackToTopButton: FC<IBackToTopButtonProps> = ({ containerRef }): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');

  const scrollToTop = () =>
    containerRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  useEventListener(
    'scroll',
    () => {
      setScrollPosition(containerRef?.current?.scrollTop || 0);
    },
    { element: containerRef?.current! },
  );

  return (
    <AnimatePresence>
      {scrollPosition > 1000 && (
        <MotionIconButton
          exit={{ y: 100, opacity: 0, transition: { duration: 0.6 } }}
          icon={BsArrowUpCircle}
          initial={{ y: 100, opacity: 0 }}
          style={{
            bottom: isSmallerThan800 ? 25 : 50,
            position: 'fixed',
            right: isSmallerThan800 ? 25 : 50,
          }}
          onClick={scrollToTop}
        />
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
