import { useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';

import { Box } from '@ui/atoms';
import { Header, SidebarContent } from '@ui/molecules';

export const SidebarWithHeader: FC = (): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box bg="gray.100" overflow="hidden">
      <Header isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      {isOpen ? <SidebarContent onClose={onClose} /> : null}
    </Box>
  );
};
