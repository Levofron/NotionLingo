import { useMediaQuery } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useCallback, useState } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';

import { useEventListener } from '@infrastructure/utils';

import { Icon } from '..';
import { IBackToTopButtonProps } from './back-to-top-button.types';

export const BackToTopButton: FC<IBackToTopButtonProps> = ({ containerRef }): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');

  const scrollToTop = () =>
    containerRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  const updateScrollPosition = useCallback(() => {
    setScrollPosition(containerRef?.current?.scrollTop || 0);
  }, []);

  useEventListener('scroll', updateScrollPosition, { element: containerRef?.current! });

  return (
    <AnimatePresence>
      {scrollPosition > 1000 && (
        <motion.button
          animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.6 } }}
          initial={{ y: 100, opacity: 0 }}
          style={{
            bottom: isSmallerThan800 ? 25 : 50,
            position: 'fixed',
            right: isSmallerThan800 ? 25 : 50,
          }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 1 }}
        >
          <Icon
            as={BsArrowUpCircle}
            bg="gray.50"
            borderRadius="999px"
            cursor="pointer"
            fontSize={{ base: '6xl', md: '7xl' }}
            p={1}
            onClick={scrollToTop}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
