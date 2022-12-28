import { useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';

import { Box, Drawer, DrawerContent } from '@ui/atoms';
import { Header, SidebarContent } from '@ui/molecules';

import { ISidebarWithHeaderProps } from './sidebar-with-header.types';

export const SidebarWithHeader: FC<ISidebarWithHeaderProps> = ({ children }): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box bg="gray.100" minH="100vh">
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        returnFocusOnClose={false}
        size="full"
        onClose={onClose}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />
      <Box p="4">{children}</Box>
    </Box>
  );
};
