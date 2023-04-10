import { useDisclosure } from '@chakra-ui/react';
import { FC, useEffect } from 'react';

import { Box } from '@presentation/atoms';
import { Header, SidebarContent } from '@presentation/molecules';

export const SidebarWithHeader: FC = (): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'scroll';

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isOpen]);

  return (
    <Box bg="gray.50" overflow="hidden">
      <Header isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      {isOpen ? <SidebarContent onClose={onClose} /> : null}
    </Box>
  );
};
