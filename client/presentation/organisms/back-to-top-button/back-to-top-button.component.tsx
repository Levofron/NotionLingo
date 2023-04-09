import { useMediaQuery } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';

import { MotionIconButton } from '@presentation/molecules';

import { scrollToTop } from '@infrastructure/functions';
import { useEventListener } from '@infrastructure/hooks';

import { IBackToTopButtonProps } from './back-to-top-button.types';

export const BackToTopButton: FC<IBackToTopButtonProps> = ({ containerRef }): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');

  useEventListener(
    'scroll',
    () => {
      setScrollPosition(containerRef?.current?.scrollTop || 0);
    },
    { element: containerRef?.current! },
  );

  const handleClick = () => scrollToTop(containerRef?.current, 'smooth');

  return (
    <AnimatePresence>
      {scrollPosition > 500 && (
        <MotionIconButton
          exit={{ y: 100, opacity: 0, transition: { duration: 0.6 } }}
          icon={BsArrowUpCircle}
          initial={{ y: 100, opacity: 0 }}
          style={{
            bottom: isSmallerThan800 ? 25 : 50,
            position: 'fixed',
            right: isSmallerThan800 ? 25 : 50,
          }}
          onClick={handleClick}
        />
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
