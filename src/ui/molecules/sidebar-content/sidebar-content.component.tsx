import { useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import { Box, CloseButton, Flex, Text } from '@ui/atoms';
import { NavigationItem } from '@ui/molecules';

import { sidebarItems } from './sidebar-content.defaults';
import { ISidebarContentProps } from './sidebar-content.types';

export const SidebarContent: FC<ISidebarContentProps> = ({
  onClose,
  ...restProps
}): JSX.Element => (
  <Box
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    h="full"
    pos="fixed"
    transition="3s ease"
    w="full"
    {...restProps}
  >
    <Flex alignItems="center" h="20" justifyContent="space-between" mx="8">
      <Text fontFamily="monospace" fontSize="2xl" fontWeight="bold">
        Levofron
      </Text>
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {sidebarItems.map(({ href, icon, name }) => (
      <NavigationItem key={name} href={href} icon={icon}>
        {name}
      </NavigationItem>
    ))}
  </Box>
);
